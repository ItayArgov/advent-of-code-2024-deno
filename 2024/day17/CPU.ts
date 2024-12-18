const ACHAR = "A".charCodeAt(0);

export class CPU {
  PC: number;
  A: bigint;
  B: bigint;
  C: bigint;
  outs: bigint[];
  program: number[];

  constructor(
    program: string | number[],
    A: bigint = 0n,
    B: bigint = 0n,
    C: bigint = 0n,
  ) {
    if (typeof program === "string") {
      const { A, B, C, parsedProgram } = this.parseInput(program);
      this.program = parsedProgram;
      this.A = A;
      this.B = B;
      this.C = C;
    } else {
      this.A = A;
      this.B = B;
      this.C = C;
      this.program = program;
    }
    this.outs = [];
    this.PC = 0;
  }

  private getValue(op: number): bigint {
    return op < 4
      ? BigInt(op)
      : BigInt(
          this[String.fromCharCode(Number(op - 4 + ACHAR)) as "A" | "B" | "C"],
        );
  }

  private divByRegister(reg: "A" | "B" | "C", op: number): void {
    this[reg] = this.A / 2n ** this.getValue(op);
  }

  private bxl(n: number): void {
    this.B ^= BigInt(n);
  }

  private bst(combo: number): void {
    this.B = this.getValue(combo) % 8n;
  }

  private jnz(n: number): boolean {
    if (this.A !== 0n) {
      this.PC = n;
      return true; // Indicates PC was manually changed
    }
    return false;
  }

  private bxc(): void {
    this.B ^= this.C;
  }

  private out(n: number): void {
    this.outs.push(this.getValue(n) % 8n);
  }

  calculateOp(): boolean {
    if (this.PC >= this.program.length) return false;

    const pc = this.PC;
    const op = this.program[pc];
    const arg = this.program[pc + 1];

    let manualPCChange = false;

    switch (op) {
      case 0:
        this.divByRegister("A", arg);
        break;
      case 1:
        this.bxl(arg);
        break;
      case 2:
        this.bst(arg);
        break;
      case 3:
        manualPCChange = this.jnz(arg);
        break;
      case 4:
        this.bxc();
        break;
      case 5:
        this.out(arg);
        break;
      case 6:
        this.divByRegister("B", arg);
        break;
      case 7:
        this.divByRegister("C", arg);
        break;
      default:
        throw new Error(`Unknown opcode: ${op} at position ${pc}`);
    }

    if (!manualPCChange) {
      this.PC += 2; // Default PC increment for most operations
    }

    return true;
  }

  runWithA(value: bigint) {
    this.A = value;
    this.B = 0n;
    this.C = 0n;
    this.outs = [];
    this.PC = 0;
    this.run();
  }

  parseInput(input: string) {
    const [registers, programStr] = input.split("\n\n");
    const regLines = registers.split("\n");

    const reg = /(\d+)/;
    const A = BigInt(parseInt(regLines[0].match(reg)![0]));
    const B = BigInt(parseInt(regLines[1].match(reg)![0]));
    const C = BigInt(parseInt(regLines[2].match(reg)![0]));

    const parsedProgram = programStr
      .slice("Program: ".length)
      .split(",")
      .map(Number);

    return { A, B, C, parsedProgram };
  }

  run(): void {
    while (this.calculateOp());
  }
}
