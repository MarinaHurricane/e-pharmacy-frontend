"use client";

import { registerUser } from "@/app/lib/api/authApi";

export default function RegisterPage() {
  const handleTest = async () => {
    try {
      const result = await registerUser({
        name: "Asya",
        email: "asya@example.com",
        phone: "+441234567892",
        password: "12345678",
      });

      console.log("REGISTER SUCCESS:", result);
    } catch (error) {
      console.error("REGISTER ERROR:", error);
    }
  };

  return (
    <main>
      <h1>Register</h1>

      <button type="button" onClick={handleTest}>
        Test Register
      </button>
    </main>
  );
}