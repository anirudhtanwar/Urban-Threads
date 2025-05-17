
import { useState } from "react";
import { Settings } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { AccessibilitySettings } from "./accessibility-settings";
import { useAccessibility } from "@/context/accessibility-context";

export function SettingsMenu() {
  const [accessibilityDialogOpen, setAccessibilityDialogOpen] = useState(false);
  const { enabled: accessibilityEnabled } = useAccessibility();
  
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Settings className="h-5 w-5" />
            {accessibilityEnabled && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="end">
          <div className="grid gap-2">
            <h4 className="font-medium text-sm">Settings</h4>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setAccessibilityDialogOpen(true)}
            >
              Accessibility
              {accessibilityEnabled && (
                <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      <AccessibilitySettings 
        open={accessibilityDialogOpen} 
        onOpenChange={setAccessibilityDialogOpen} 
      />
    </>
  );
}
