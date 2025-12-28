"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { loginSchema, registerSchema } from "@/lib/schemas"
import { loginAction, registerAction } from "@/app/auth/auth-action"
import { CustomFormField } from "@/components/FormField"
import { toast } from "sonner"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  })

  async function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true)
    const res = await loginAction(values)
    
    if (res?.error) {
      toast.error("Gagal masuk", { description: res.error })
    }
    setLoading(false)
  }

  async function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true)
    const res = await registerAction(values)

    if (res?.error) {
      toast.error("Gagal mendaftar", { description: res.error })
    } else if (res?.success) {
      toast.success("Pendaftaran Berhasil!")
      registerForm.reset()
    }
    setLoading(false)
  }

  const tabContentAnimation = "mt-0 focus-visible:outline-none data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:slide-in-from-bottom-4 data-[state=active]:duration-500 data-[state=active]:ease-in-out"

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans text-foreground transition-colors duration-300">
      
      <Tabs defaultValue="login" className="w-full max-w-100">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/30 p-1.5 h-auto rounded-2xl">
          <TabsTrigger 
            value="login" 
            className="rounded-xl py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Masuk
          </TabsTrigger>
          <TabsTrigger 
            value="register" 
            className="rounded-xl py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
          >
            Daftar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login" className={tabContentAnimation}>
          <Card className="border-none shadow-none bg-card">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-primary tracking-tight">Selamat Datang</CardTitle>
              <CardDescription className="text-muted-foreground">Lanjutkan jurnal harianmu.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
                  <CustomFormField 
                    control={loginForm.control}
                    name="email"
                    label="Email"
                    placeholder="user@example.com"
                  />
                  <CustomFormField 
                    control={loginForm.control}
                    name="password"
                    label="Password"
                    type="password"
                  />

                  <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl shadow-primary/25 hover:shadow-primary/40 shadow-lg transition-all active:scale-[0.98]" disabled={loading}>
                    {loading ? "Memproses..." : "Masuk"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register" className={tabContentAnimation}>
          <Card className="border-none shadow-none bg-card">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-primary tracking-tight">Buat Akun</CardTitle>
              <CardDescription className="text-muted-foreground">Mulai mencatat momen berhargamu.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-5">
                  <CustomFormField 
                    control={registerForm.control}
                    name="fullName"
                    label="Nama Lengkap"
                    placeholder="Budi Santoso"
                  />
                  <CustomFormField 
                    control={registerForm.control}
                    name="email"
                    label="Email"
                    placeholder="user@example.com"
                  />
                  <CustomFormField 
                    control={registerForm.control}
                    name="password"
                    label="Password"
                    type="password"
                  />

                  <Button type="submit" className="w-full h-12 text-base font-semibold rounded-xl shadow-primary/25 hover:shadow-primary/40 shadow-lg transition-all active:scale-[0.98]" disabled={loading}>
                    {loading ? "Mendaftar..." : "Daftar Akun"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}