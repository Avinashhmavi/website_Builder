import { Dialog, DialogContent } from "../ui/dialog";

function ProModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg lg:!p-8 !rounded-3xl !bg-white !border-neutral-100">
        <main className="flex flex-col items-center text-center relative pt-2">
          <p className="text-2xl font-bold text-neutral-950 mb-4">
            You now have unlimited access to all features.
          </p>
          <p className="text-neutral-500 text-base mt-2 max-w-sm">
            Enjoy using Asho website modifer with no restrictions!
          </p>
        </main>
      </DialogContent>
    </Dialog>
  );
}

export default ProModal;
