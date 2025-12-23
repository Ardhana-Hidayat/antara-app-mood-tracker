import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { login, signup } from "@/app/auth/auth-action";

export default async function LoginPage(props: {
  searchParams: Promise<{ message: string }>;
}) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Tabs defaultValue="login" className="w-full max-w-100">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Masuk</TabsTrigger>
          <TabsTrigger value="register">Daftar</TabsTrigger>
        </TabsList>

        {searchParams.message && (
          <div className="mb-4 p-3 text-sm font-medium text-center rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
            {searchParams.message}
          </div>
        )}
        
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Selamat Datang Kembali</CardTitle>
              <CardDescription>Masukan kredensial akun Anda.</CardDescription>
            </CardHeader>
            <form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="nama@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <Input id="password" name="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button formAction={login} className="w-full">Masuk</Button>
                <Button variant="outline" className="w-full" type="button">Masuk dengan Google</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="register">
           <Card>
            <CardHeader>
              <CardTitle>Buat Akun Baru</CardTitle>
              <CardDescription>Mulai perjalanan jurnalmu hari ini.</CardDescription>
            </CardHeader>
            <form>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" name="email" type="email" placeholder="nama@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-pass">Kata Sandi</Label>
                  <Input id="reg-pass" name="password" type="password" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button formAction={signup} className="w-full">Daftar Akun</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}