import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="text-center">React Hook Form UI</div>
      <div className="flex justify-center items-center">
        <div className="w-[500px]">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
