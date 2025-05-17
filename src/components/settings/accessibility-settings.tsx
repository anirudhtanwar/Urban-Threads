
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAccessibility } from "@/context/accessibility-context";

interface AccessibilitySettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccessibilitySettings({ open, onOpenChange }: AccessibilitySettingsProps) {
  const { enabled, toggleEnabled, options, updateOption, resetOptions } = useAccessibility();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
          <DialogDescription>
            Customize your browsing experience with our accessibility features.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Accessibility Features</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Turn on accessibility mode to use all features
              </p>
            </div>
            <Switch 
              checked={enabled}
              onCheckedChange={toggleEnabled}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">High Contrast Mode</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enhance text visibility with higher contrast colors
                </p>
              </div>
              <Switch 
                checked={options.highContrast}
                onCheckedChange={(checked) => updateOption('highContrast', checked)}
                disabled={!enabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Large Text</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Increase text size for better readability
                </p>
              </div>
              <Switch 
                checked={options.largeText}
                onCheckedChange={(checked) => updateOption('largeText', checked)}
                disabled={!enabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Reduced Motion</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Minimize animations for motion sensitivity
                </p>
              </div>
              <Switch 
                checked={options.reducedMotion}
                onCheckedChange={(checked) => updateOption('reducedMotion', checked)}
                disabled={!enabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Screen Reader Support</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enhanced support for screen readers
                </p>
              </div>
              <Switch 
                checked={options.screenReader}
                onCheckedChange={(checked) => updateOption('screenReader', checked)}
                disabled={!enabled}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={resetOptions}>
            Reset to Default
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
