type Betting = {
    id: number;
    userId: number;
    bet: number;
    isWin: boolean;
}
const getSummary = (betting: Betting[]) => {

    let win = 0;
    let lose = 0;
    betting.forEach((item) => {
        if (item.isWin) {
            win += item.bet;
        } else {
            lose += item.bet;
        }

    })
    return {
        win,
        lose,
    }
}


const getWinChance = (betting: Betting[]): number => {
    let win = 0;
    let lose = 0;
    betting.forEach((item) => {
        if (item.isWin) {
            win += 1;
        } else {
            lose += 1;
        }

    })
    return win / (win + lose);
}


export default {
    getSummary,
    getWinChance,
}
