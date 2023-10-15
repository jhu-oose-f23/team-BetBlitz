import { Button } from "../../components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "../../components/ui/dialog"
  

export default function Modal() {
    return (
    <Dialog>
        <DialogTrigger>
            <Button>Real Madrid</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Bet on Real Madrid</DialogTitle>
                <DialogDescription>How many BlitzBux would you like to bet?</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Bet Amount</Label>
                <Input
                id="betAmount"
                defaultValue="100"
                className="col-span-3"
                />
            </div>
            <DialogFooter>
                <DialogClose>
                    <Button type="submit">Place bet</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}

{/* <Dialog>
                          <DialogTrigger>
                            <Button className="ml-4">
                              {event.teamOneOdd > 0 ? "+" : ""}
                              {event.teamOneOdd}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Bet on {event.teamOneName}</DialogTitle>
                              <DialogDescription>How many BlitzBux would you like to bet?</DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Bet Amount</Label>
                            <Input
                              id="betAmount"
                              defaultValue="100"
                              className="col-span-3"
                            />
                            </div>
                            <DialogFooter>
                              <DialogClose>
                                <Button type="submit">Place bet</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog> */}