import { firestore } from "@/config/firebase";
import { ResponseType, WalletType } from "@/types";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where, writeBatch } from "@firebase/firestore";
import { uploadFileToCloudinary } from "./imageServices";

export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    let walletToSave = { ...walletData };

    if (walletData.image) {
      const imageUploadRes = await uploadFileToCloudinary(
        walletData.image,
        "wallets"
      );
      if (!imageUploadRes.success) {
        return {
          success: false,
          msg: imageUploadRes.msg || "Failed to upload wallet icon",
        };
      }
      walletToSave.image = imageUploadRes.data;
    }

    if (!walletData?.id) {
      walletToSave.amount = 0;
      walletToSave.totalIncome = 0;
      walletToSave.totalExpenses = 0;
      walletToSave.created = new Date();
    }

    const walletRef = walletData?.id
      ? doc(firestore, "wallets", walletData?.id)
      : doc(collection(firestore, "wallets"));

    await setDoc(walletRef, walletToSave, { merge: true });
    return { success: true, data: { ...walletToSave, id: walletRef.id } };
  } catch (error: any) {
    console.log("error creating or updating wallet: ", error);
    return { success: false, msg: error.message };
  }
};


export const deleteWallet= async(walletId:string):Promise<ResponseType>=>{
    try {
        const walletRef= doc(firestore, "wallets", walletId);
        await deleteDoc(walletRef);

      deleteTransactionByWalletId(walletId);

        return{success:true, msg:'wallet deleted successfully'}
    } catch (error:any) {
        console.log('error deleting wallet', error);
        return{success:false, msg:error.message}
    }
}

export const deleteTransactionByWalletId= async(walletId:string):Promise<ResponseType>=>{
    try {
       let hasMoreTransactions =true;

       while(hasMoreTransactions){
          const transactionQuery = query(
            collection(firestore,'transactions'),
            where('walletId','==',walletId),
          );

          const transactionSnapshot= await getDocs(transactionQuery);

          if (transactionSnapshot.size == 0){
            hasMoreTransactions= false;
            break;
          }

          const batch= writeBatch(firestore);

          transactionSnapshot.forEach((transactionDoc)=>{
            batch.delete(transactionDoc.ref);
          })

       }
       return{success:true , msg: "All transactions deleted successfully"}

    } catch (error:any) {
        console.log('error deleting wallet', error);
        return{success:false, msg:error.message}
    }
}