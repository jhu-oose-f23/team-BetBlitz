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
}

const BetDialog = (props: PropType) => {
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
            <DialogTitle>
              Bet on {name}
            </DialogTitle>
            <DialogDescription>
              How many BlitzBux would you like to bet?
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 items-center gap-4 py-6">
            <Label
              htmlFor="name"
              className="text-right"
            >
              Bet Amount
            </Label>
            <Input
              id="betAmount"
              value={bet}
              onChange={(e) => {
                if (!Number.isNaN(+e.currentTarget.value)) {
                  setBet(+(e.currentTarget.value))
                }
              }}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <DialogClose>
              <div
                className="ml-4 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                onClick={() => handlePlaceBet(bet)}
              >
                Place Bet
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )

}

export default BetDialog;