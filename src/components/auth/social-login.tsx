
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function SocialLogin() {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full" disabled>
          Google
        </Button>
        <Button variant="outline" className="w-full" disabled>
          Apple
        </Button>
      </div>
    </div>
  );
}
