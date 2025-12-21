import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Tabs defaultValue="login" className="w-full max-w-100">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Masuk</TabsTrigger>
          <TabsTrigger value="register">Daftar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Selamat Datang Kembali</CardTitle>
              <CardDescription>Masukan kredensial akun Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nama@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input id="password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full">Masuk</Button>
              <Button variant="outline" className="w-full">Masuk dengan Google</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="register">
           <Card>
            <CardHeader>
              <CardTitle>Buat Akun Baru</CardTitle>
              <CardDescription>Mulai perjalanan jurnalmu hari ini.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-pass">Kata Sandi</Label>
                <Input id="reg-pass" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Daftar Akun</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}