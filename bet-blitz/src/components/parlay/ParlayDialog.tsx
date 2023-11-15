import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";
import { useState } from "react";

type PropType = {
  odds: number;
  name: string;
  handlePlaceBet: (amount: number) => void;
};

const ParlayDialog = (props: PropType) => {
  const { odds, name, handlePlaceBet } = props;

  const [bet, setBet] = useState(0);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="ml-4 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            {odds > 0 ? "+" : ""}
            {odds}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bet on {name}</DialogTitle>
            <DialogDescription>
              Add this event to your parlay?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <div
                className="w-full h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                onClick={() => handlePlaceBet(bet)}
              >
                Add
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ParlayDialog;
