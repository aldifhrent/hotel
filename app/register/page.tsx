import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "./components/register-forms";

const RegisterPage = () => {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen">
      <div className="w-full mb-12 mt-12 m-auto lg:max-w-lg border">
        <Card className="w-full">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center">Form Pemesanan</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
