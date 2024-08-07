'use client' // for Next.js app router
import { IDKitWidget, VerificationLevel, ISuccessResult, IErrorState } from '@worldcoin/idkit'
import { verify } from "./actions/verify";


const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
const action = process.env.NEXT_PUBLIC_WLD_ACTION;

const Login = () => {
  if (!app_id) {
    throw new Error("app_id is not set in environment variables!");
  }
  if (!action) {
    throw new Error("action is not set in environment variables!");
  }

  const onSuccess = (result: ISuccessResult) => {
    console.log('onSuccess', result)
  }

  const onError = (error: IErrorState) => {
    console.log('onError', error)
  }

  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", { // route to your backend will depend on implementation
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
    })
    if (!res.ok) {
        throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };
  console.log(app_id, action, 'ffffffffff')

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <IDKitWidget
        app_id={app_id} // obtained from the Developer Portal
        action={action} // obtained from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // callback when the proof is received
        onError={onError}
        verification_level={VerificationLevel.Device}
    >
        {({ open }) => 
            // This is the button that will open the IDKit modal
            <button onClick={open}>Verify with World ID</button>
        }
    </IDKitWidget>
    </div>
  )
}

export default Login