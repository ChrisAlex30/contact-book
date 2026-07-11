import ConfirmRegistrationForm from "../../components/auth/ConfirmRegistrationForm";
import GuestRoute from "../../components/auth/GuestRoute";

export default function ConfirmRegistrationPage() {
    return 
    (
     <GuestRoute>
     <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
         <ConfirmRegistrationForm />
     </main>   
     </GuestRoute>   
    )
}