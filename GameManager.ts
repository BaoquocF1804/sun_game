enum TubeType {
    Normal = 'normal',
    Magic = 'magic'
  }
  
  class GameManager {
    private currentState: number[][];
    private magicTubes: number[];
    private tubeTypes: TubeType[];
  
    constructor(initState: number[][], magicTubes: number[]) {
      this.currentState = initState;
      this.magicTubes = magicTubes;
      this.tubeTypes = Array(initState.length).fill(TubeType.Normal);
  
      console.log('INIT GAME:');
      console.log(`Magic tubes indexes: ${magicTubes.join(', ')}`);
      this.printState();
    }
  
    public move(from: number, to: number): void {
      if (from < 0 || from >= this.currentState.length || to < 0 || to >= this.currentState.length) {
        console.log('Invalid move: tube index out of range');
        return;
      }
  
      const sourceTube = this.currentState[from];
      const targetTube = this.currentState[to];
      const sourceTubeType = this.tubeTypes[from];
      const targetTubeType = this.tubeTypes[to];
  
    //   if (sourceTube.length === 0) {
    //     console.log('Invalid move: source tube is empty');
    //     return;
    //   }
  
    //   if (targetTube.length === 4) {
    //     console.log('Invalid move: target tube is full');
    //     return;
    //   }
  
      const ball = this.getBallToMove(sourceTube, sourceTubeType);
      if (ball === -1) {
        console.log('Invalid move: no valid ball to move');
        return;
      }
  
      targetTube.push(ball);
      sourceTube.splice(sourceTube.indexOf(ball), 1);
      
      if (targetTubeType === TubeType.Magic) {
        sourceTube.unshift(0);
      }
      else {
        sourceTube.push(0);
      }
  
      console.log(`MOVE FROM ${from} TO ${to}:`);
      this.printState();
  
      if (this.isWin()) {
        console.log('YOU WIN');
      }
    }
  
    private getBallToMove(tube: number[], tubeType: TubeType): number {
      const magicTubeIndex = this.magicTubes[0];
      if (tubeType === TubeType.Magic) {
        return tube[tube.length - 1];
      } else if (magicTubeIndex !== -1) {
        return tube[0];
      } else {
        return tube[tube.length - 1];
      }
    }
  
    public isWin(): boolean {
        return this.currentState.every(tube => {
            const firstColor = tube[0]
            for (let i = 1; i < tube.length; i++) {
                const color = tube[i]

                if (firstColor != color) return false
            }

            return true
        })
    }
  
    private printState(): void {
      const transposedState = this.currentState[0].map((_, colIndex) =>
        this.currentState.map((row) => row[row.length - 1 - colIndex])
      );
  
      console.log(transposedState.map((row) => row.join('\t')).join('\n'));
    }
  }
  
  export default GameManager;
  