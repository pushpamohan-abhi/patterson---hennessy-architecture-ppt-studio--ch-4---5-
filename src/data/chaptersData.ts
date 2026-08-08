import { SectionData } from "../types";

export const chaptersData: SectionData[] = [
  // --- CHAPTER 4: THE PROCESSOR ---
  {
    sectionNumber: "4.1",
    chapter: 4,
    title: "Introduction to Processor Design",
    slides: [
      {
        id: "4.1-1",
        sectionNumber: "4.1",
        chapter: 4,
        title: "Introduction: The Processor Implementation",
        subtitle: "Patterson & Hennessy Chapter 4",
        bulletPoints: [
          "Overview of how a processor executes instructions (Fetch, Decode, Execute, Memory, Writeback)",
          "Core components: Datapath (performs arithmetic & data movement) and Control (directs datapath)",
          "Focus on RISC-V instruction subset: ALU instructions (add, sub, and, or), load/store (ld, sd), and branches (beq)"
        ],
        keyFormula: "Execution Time = Instruction Count × CPI × Clock Cycle Time",
        exampleProblem: {
          title: "Processor Performance Trade-off",
          problemStatement: "Compare a single-cycle implementation vs. a multi-cycle/pipelined implementation for a program with 1,000,000 instructions.",
          steps: [
            "Single-cycle: Clock cycle time = longest instruction time (e.g., 250ps), CPI = 1.0.",
            "Pipelined: Clock cycle time = stage delay (e.g., 50ps), ideal CPI = 1.0 (with hazards CPI = 1.2).",
            "Calculate Total Time Single-Cycle: 1,000,000 × 1.0 × 250 ps = 250 µs.",
            "Calculate Total Time Pipelined: 1,000,000 × 1.2 × 50 ps = 60 µs."
          ],
          finalAnswer: "Pipelining achieves a 4.16x speedup in this scenario."
        },
        diagramType: "datapath",
        notes: "Emphasize that processor design is fundamentally about balancing clock cycle time against CPI."
      }
    ]
  },
  {
    sectionNumber: "4.2",
    chapter: 4,
    title: "Logic Design Conventions",
    slides: [
      {
        id: "4.2-1",
        sectionNumber: "4.2",
        chapter: 4,
        title: "Logic Design Conventions",
        subtitle: "Synchronous Systems & Timing",
        bulletPoints: [
          "Combinational logic: Outputs depend strictly on current inputs (AND, OR, multiplexers, ALU)",
          "State (sequential) elements: Memory elements holding state (Registers, Register File, Data Memory)",
          "Clocking methodology: Determines when data can be read and written, preventing race conditions",
          "Setup time and Hold time constraints in flip-flops"
        ],
        keyFormula: "Clock Cycle Time ≥ T_cl_max + T_pcq + T_setup",
        exampleProblem: {
          title: "Clock Frequency Calculation",
          problemStatement: "Given maximum combinational delay T_cl = 200ps, register clock-to-Q delay T_pcq = 30ps, and setup time T_setup = 20ps, what is the maximum clock frequency?",
          steps: [
            "Minimum Clock Cycle = T_cl + T_pcq + T_setup",
            "Cycle = 200 + 30 + 20 = 250 ps = 0.25 ns",
            "Max Frequency = 1 / (250 × 10^-12 s)"
          ],
          finalAnswer: "4.0 GHz maximum clock frequency."
        },
        diagramType: "datapath",
        notes: "Explain why state elements require a clock edge to update values."
      }
    ]
  },
  {
    sectionNumber: "4.3",
    chapter: 4,
    title: "Building a Datapath",
    slides: [
      {
        id: "4.3-1",
        sectionNumber: "4.3",
        chapter: 4,
        title: "Building a Datapath: Elements & Assembly",
        subtitle: "Connecting State and Combinational Elements",
        bulletPoints: [
          "Instruction Memory: Holds instructions, addressed by Program Counter (PC)",
          "Register File: 32 registers (x0 to x31), supports 2 read ports and 1 write port",
          "ALU: Performs arithmetic and logic operations (Add, Sub, AND, OR)",
          "Sign-Extension unit: Extends 12-bit immediate values to 64 bits"
        ],
        keyFormula: "PC_next = PC + 4 (for sequential execution)",
        exampleProblem: {
          title: "Datapath Component Sizing",
          problemStatement: "For a RISC-V 64-bit architecture, what is the width of the instruction memory address bus and the register file data bus?",
          steps: [
            "Instruction memory address: 64-bit PC (though typically lower bits address bytes/instructions).",
            "Register file data bus: 64 bits per register value.",
            "Immediate generation: Takes 12-bit offset from instruction[31:20] and sign-extends to 64 bits."
          ],
          finalAnswer: "64-bit data paths across registers and ALU."
        },
        diagramType: "datapath",
        notes: "Walk through how data flows from instruction fetch through register read."
      }
    ]
  },
  {
    sectionNumber: "4.4",
    chapter: 4,
    title: "A Simple Implementation Scheme",
    slides: [
      {
        id: "4.4-1",
        sectionNumber: "4.4",
        chapter: 4,
        title: "Single-Cycle Datapath & Control",
        subtitle: "ALU Control and Main Control Signals",
        bulletPoints: [
          "Single-cycle implementation executes each instruction in one clock cycle",
          "Main Control Unit decodes opcode (instruction[6:0]) to generate control signals: ALUSrc, MemToReg, RegWrite, MemRead, MemWrite, Branch",
          "ALU Control Unit combines ALUOp and instruction funct3/funct7 to configure the ALU",
          "Limitation: Clock cycle is dictated by the slowest instruction (usually Load Word)"
        ],
        keyFormula: "T_cycle = Instruction Memory + Register Read + ALU + Data Memory + Register Write",
        exampleProblem: {
          title: "Control Signal Decoding",
          problemStatement: "Determine control signals for a RISC-V load instruction (ld x1, 8(x2)).",
          steps: [
            "Opcode for ld is 0000011.",
            "ALUSrc = 1 (use immediate offset), MemToReg = 1 (data from memory to register).",
            "RegWrite = 1 (write destination register x1), MemRead = 1, MemWrite = 0.",
            "Branch = 0, ALUOp = 00 (addition for address calculation)."
          ],
          finalAnswer: "ALUSrc=1, MemToReg=1, RegWrite=1, MemRead=1, MemWrite=0, ALUOp=00."
        },
        diagramType: "datapath",
        notes: "Highlight why single-cycle is inefficient in practice due to unutilized hardware speed during fast instructions like add."
      }
    ]
  },
  {
    sectionNumber: "4.5",
    chapter: 4,
    title: "An Overview of Pipelining",
    slides: [
      {
        id: "4.5-1",
        sectionNumber: "4.5",
        chapter: 4,
        title: "Overview of Pipelining",
        subtitle: "Analogy & Performance Principles",
        bulletPoints: [
          "Pipelining overlaps execution of multiple instructions (like an assembly line)",
          "RISC-V 5-stage pipeline: IF (Instruction Fetch), ID (Instruction Decode), EX (Execute), MEM (Memory Access), WB (Write Back)",
          "Ideal speedup equals the number of pipeline stages (5x for 5 stages)",
          "Pipeline Hazards limit ideal speedup: Structural hazards, Data hazards, Control hazards"
        ],
        keyFormula: "Speedup = (Pipeline Depth × Time_single) / (Time_pipeline_stage + Stall Penalty)",
        exampleProblem: {
          title: "Pipeline Speedup Calculation",
          problemStatement: "A non-pipelined processor has a 800ps clock cycle. A 5-stage pipelined version has a 200ps clock cycle but incurs a 100ps overhead per instruction due to register delays. What is the speedup for 1000 instructions?",
          steps: [
            "Non-pipelined time for 1000 instructions = 1000 × 800ps = 800,000 ps.",
            "Pipelined time = (5 + 1000 - 1) × (200 + 10ps register overhead) = 1004 × 210 ps = 210,840 ps.",
            "Speedup = 800,000 / 210,840 ≈ 3.79x."
          ],
          finalAnswer: "3.79x speedup."
        },
        diagramType: "pipeline",
        notes: "Explain why stage latency imbalance and pipeline register overhead slightly reduce theoretical speedup."
      }
    ]
  },
  {
    sectionNumber: "4.6",
    chapter: 4,
    title: "Pipelined Datapath and Control",
    slides: [
      {
        id: "4.6-1",
        sectionNumber: "4.6",
        chapter: 4,
        title: "Pipelined Datapath & Control Registers",
        subtitle: "IF/ID, ID/EX, EX/MEM, MEM/WB Pipeline Registers",
        bulletPoints: [
          "Pipeline registers separate stages and hold intermediate instruction data and control signals",
          "Control signals are passed down the pipeline alongside instruction data",
          "Data paths must handle write-back values routed back to earlier stages",
          "Register file read/write optimization: Write in first half of cycle, read in second half"
        ],
        keyFormula: "Pipeline Register Width = PC + Instruction + Data Values + Control Signals",
        exampleProblem: {
          title: "Pipeline Register Propagation",
          problemStatement: "An add instruction is in the EX stage. Where are its control signals currently stored?",
          steps: [
            "Control signals generated in ID stage are passed into the ID/EX pipeline register.",
            "During EX, the execution unit consumes the relevant control bits from ID/EX.",
            "Remaining control bits (for MEM and WB) are passed forward into EX/MEM and subsequently MEM/WB."
          ],
          finalAnswer: "Stored in ID/EX pipeline register (and passing forward to EX/MEM)."
        },
        diagramType: "pipeline",
        notes: "Show how pipeline registers prevent data from overwriting each other prematurely."
      }
    ]
  },
  {
    sectionNumber: "4.7",
    chapter: 4,
    title: "Data Hazards: Forwarding versus Stalling",
    slides: [
      {
        id: "4.7-1",
        sectionNumber: "4.7",
        chapter: 4,
        title: "Data Hazards: Forwarding & Stalling",
        subtitle: "Resolving RAW (Read-After-Write) Hazards",
        bulletPoints: [
          "Data hazard occurs when an instruction depends on the result of a previous instruction still in the pipeline",
          "Forwarding (Bypassing): Feeds ALU result directly from EX/MEM or MEM/WB back to EX input ALU multiplexers",
          "Load-Use Data Hazard: Occurs when a load instruction is followed immediately by a dependent instruction; cannot be solved by forwarding alone, requires a 1-cycle stall",
          "Hazard Detection Unit stalls the pipeline by freezing PC and IF/ID registers and inserting a bubble (NOP)"
        ],
        keyFormula: "Stall Cycles = Frequency of Load-Use Hazards × 1 cycle penalty",
        exampleProblem: {
          title: "Forwarding Unit Detection",
          problemStatement: "Given: add x1, x2, x3 followed by sub x4, x1, x5. Identify forwarding conditions.",
          steps: [
            "add produces result in EX/MEM stage (destination x1).",
            "sub needs x1 as source register 1 in EX stage.",
            "ForwardA condition met: EX/MEM.RegisterRd == ID/EX.RegisterRs1 (and RegWrite is active).",
            "Forwarding unit asserts mux control to route EX/MEM ALU output directly to ALU input A."
          ],
          finalAnswer: "EX hazard condition met; forward ALU result from EX/MEM to ALU input."
        },
        diagramType: "pipeline",
        notes: "Contrast forwarding (free) vs stalling (costs performance cycles)."
      }
    ]
  },
  {
    sectionNumber: "4.8",
    chapter: 4,
    title: "Control Hazards",
    slides: [
      {
        id: "4.8-1",
        sectionNumber: "4.8",
        chapter: 4,
        title: "Control Hazards & Branch Prediction",
        subtitle: "Handling Conditional Branches",
        bulletPoints: [
          "Control hazards occur when instruction fetch depends on branch outcome (evaluated in EX or ID stage)",
          "Default strategy: Stall until branch outcome is known (causes severe performance penalty)",
          "Branch Prediction: Static prediction (predict taken/not taken) or Dynamic prediction (Branch History Table / Branch Target Buffer)",
          "Flushing: If prediction is wrong, flush instructions currently in IF, ID, and EX stages"
        ],
        keyFormula: "Branch Penalty = Branch Frequency × Misprediction Rate × Penalty Cycles",
        exampleProblem: {
          title: "Branch Penalty Calculation",
          problemStatement: "A program has 20% branch instructions. Branch outcomes are resolved in the EX stage (2 cycle penalty). If static prediction has a 40% misprediction rate, what is the average CPI penalty?",
          steps: [
            "Branch frequency = 0.20",
            "Misprediction rate = 0.40",
            "Stall penalty per misprediction = 2 cycles",
            "CPI penalty = 0.20 × 0.40 × 2 = 0.16 extra cycles per instruction"
          ],
          finalAnswer: "0.16 cycles per instruction added to baseline CPI."
        },
        diagramType: "branch",
        notes: "Explain how modern processors use 2-bit saturating counters for dynamic branch prediction."
      }
    ]
  },
  {
    sectionNumber: "4.9",
    chapter: 4,
    title: "Exceptions",
    slides: [
      {
        id: "4.9-1",
        sectionNumber: "4.9",
        chapter: 4,
        title: "Exceptions & Interrupts",
        subtitle: "Handling Asynchronous & Synchronous Events",
        bulletPoints: [
          "Exception: Internal unexpected event (arithmetic overflow, undefined opcode, page fault)",
          "Interrupt: External asynchronous event (I/O completion request, timer tick)",
          "Precise Exceptions: Processor state is preserved exactly as if instructions executed sequentially up to the faulting instruction",
          "Mechanism: Save PC in Exception Program Counter (EPC), save cause in cause register, jump to kernel exception handler"
        ],
        keyFormula: "Handler Address = Base Vector Table + Exception Cause Offset",
        exampleProblem: {
          title: "Arithmetic Overflow Exception",
          problemStatement: "An add instruction causes an overflow in the EX stage. How does the pipeline handle it precisely?",
          steps: [
            "Mark the instruction in pipeline with an exception flag.",
            "Prevent writing to destination register and suppress memory writes for faulting instruction.",
            "When instruction reaches MEM/WB stage, trigger exception trap.",
            "Save PC of faulting instruction into EPC and branch to OS handler."
          ],
          finalAnswer: "Precise exception state captured via EPC and pipeline flushing."
        },
        diagramType: "pipeline",
        notes: "Emphasize the engineering challenge of maintaining precise exceptions in deeply pipelined and superscalar processors."
      }
    ]
  },

  // --- CHAPTER 5: MEMORY HIERARCHY ---
  {
    sectionNumber: "5.1",
    chapter: 5,
    title: "Introduction to Memory Hierarchy",
    slides: [
      {
        id: "5.1-1",
        sectionNumber: "5.1",
        chapter: 5,
        title: "Introduction: Memory Hierarchy & Locality",
        subtitle: "Patterson & Hennessy Chapter 5",
        bulletPoints: [
          "Processor-Memory Performance Gap: CPU speeds grow much faster than DRAM access latency",
          "Principle of Locality: Temporal Locality (recently accessed items likely to be accessed again) & Spatial Locality (items near recently accessed addresses likely to be accessed)",
          "Memory Hierarchy Pyramid: Registers -> L1 Cache -> L2 Cache -> L3 Cache -> Main Memory (DRAM) -> Secondary Storage (SSD/HDD)"
        ],
        keyFormula: "Hit Rate + Miss Rate = 1.0",
        exampleProblem: {
          title: "Locality Identification",
          problemStatement: "Analyze the loop: for(int i=0; i<1000; i++) sum += arr[i]; Identify temporal and spatial locality.",
          steps: [
            "Spatial Locality: Array elements are stored contiguously in memory; loading arr[i] brings arr[i+1], arr[i+2] into cache block.",
            "Temporal Locality: Variable 'sum' and loop counter 'i' are accessed repeatedly in CPU registers/cache."
          ],
          finalAnswer: "High spatial locality in array traversal; high temporal locality in loop variables."
        },
        diagramType: "hierarchy",
        notes: "Explain how memory hierarchy exploits locality to provide large capacity at near-SRAM speed."
      }
    ]
  },
  {
    sectionNumber: "5.2",
    chapter: 5,
    title: "The Memory Hierarchy",
    slides: [
      {
        id: "5.2-1",
        sectionNumber: "5.2",
        chapter: 5,
        title: "Memory Hierarchy Metrics & Terminology",
        subtitle: "Hit, Miss, Hit Time, and Miss Penalty",
        bulletPoints: [
          "Block (Line): Minimum unit of information that can be present in a cache",
          "Hit: Data requested is found in the upper level",
          "Miss: Data requested is not found in upper level; retrieved from lower level",
          "Hit Time: Time to access upper level (includes determining hit/miss)",
          "Miss Penalty: Time to replace block in upper level from lower level + time to deliver to CPU"
        ],
        keyFormula: "AMAT = Hit Time + (Miss Rate × Miss Penalty)",
        exampleProblem: {
          title: "Average Memory Access Time (AMAT)",
          problemStatement: "L1 cache hit time = 1 ns, miss penalty = 50 ns, miss rate = 2%. Calculate AMAT.",
          steps: [
            "AMAT = Hit Time + (Miss Rate × Miss Penalty)",
            "AMAT = 1 ns + (0.02 × 50 ns)",
            "AMAT = 1 ns + 1.0 ns = 2.0 ns"
          ],
          finalAnswer: "AMAT = 2.0 ns."
        },
        diagramType: "hierarchy",
        notes: "Emphasize how even a small reduction in miss rate significantly improves AMAT."
      }
    ]
  },
  {
    sectionNumber: "5.3",
    chapter: 5,
    title: "The Basics of Caches",
    slides: [
      {
        id: "5.3-1",
        sectionNumber: "5.3",
        chapter: 5,
        title: "The Basics of Caches: Direct-Mapped",
        subtitle: "Address Mapping: Tag, Index, and Offset",
        bulletPoints: [
          "Direct-Mapped Cache: Each memory block maps to exactly one specific location in the cache",
          "Address breakdown: [ Tag | Index | Block Offset ]",
          "Index selects the cache set/line; Tag is compared against stored tag to confirm hit; Offset selects specific byte/word within block",
          "Valid Bit: Indicates whether cache line contains valid data"
        ],
        keyFormula: "Cache Size = Number of Blocks × Block Size",
        exampleProblem: {
          title: "Cache Address Breakdown",
          problemStatement: "For a 16 KB direct-mapped cache with 4-byte blocks, using 32-bit memory addresses, how many bits are used for Index, Offset, and Tag?",
          steps: [
            "Block size = 4 bytes -> Offset = log2(4) = 2 bits.",
            "Total cache size = 16 KB = 16,384 bytes. Number of blocks = 16,384 / 4 = 4,096 blocks.",
            "Index = log2(4,096) = 12 bits.",
            "Tag = Total Address Bits (32) - Index (12) - Offset (2) = 18 bits."
          ],
          finalAnswer: "Tag = 18 bits, Index = 12 bits, Offset = 2 bits."
        },
        diagramType: "cache",
        notes: "Walk through how tag comparison and valid bit checking determine a cache hit."
      }
    ]
  },
  {
    sectionNumber: "5.4",
    chapter: 5,
    title: "Measuring and Improving Cache Performance",
    slides: [
      {
        id: "5.4-1",
        sectionNumber: "5.4",
        chapter: 5,
        title: "Measuring & Improving Cache Performance",
        subtitle: "The Three C's of Misses & Associativity",
        bulletPoints: [
          "The Three C's of Cache Misses: Compulsory (cold start), Capacity (cache too small), Conflict (collision in direct-mapped)",
          "Set-Associative Cache: Each block can be placed in any of N lines in a set (e.g., 2-way, 4-way, Fully Associative)",
          "Replacement Policies: LRU (Least Recently Used), Random, FIFO",
          "Write Policies: Write-Through (update lower level immediately) vs. Write-Back (dirty bit, update lower level on eviction)"
        ],
        keyFormula: "CPU Time = (IC × (CPI_execution + Memory_Stalls_per_Inst) × Clock Cycle)",
        exampleProblem: {
          title: "AMAT with Associativity Improvement",
          problemStatement: "A direct-mapped L1 cache has 5% miss rate and 20ns miss penalty. A 2-way set-associative cache reduces miss rate to 3% but increases hit time by 10% (from 1.0ns to 1.1ns). Which is better?",
          steps: [
            "AMAT (Direct) = 1.0 + (0.05 × 20) = 1.0 + 1.0 = 2.0 ns.",
            "AMAT (2-way) = 1.1 + (0.03 × 20) = 1.1 + 0.6 = 1.7 ns."
          ],
          finalAnswer: "2-way set-associative cache is better (lower AMAT of 1.7ns vs 2.0ns)."
        },
        diagramType: "cache",
        notes: "Explain how associativity trades slightly longer hit time for significantly lower conflict miss rates."
      }
    ]
  },
  {
    sectionNumber: "5.5",
    chapter: 5,
    title: "Dependable Memory Hierarchy",
    slides: [
      {
        id: "5.5-1",
        sectionNumber: "5.5",
        chapter: 5,
        title: "Dependable Memory Hierarchy & Error Correction",
        subtitle: "Parity, Hamming Codes, and ECC",
        bulletPoints: [
          "Reliability metrics: FIT (Failures In Time = failures per 10^9 hours), MTTF (Mean Time To Failure)",
          "Parity codes: Detect 1-bit errors (single parity bit)",
          "Hamming Codes: Error-Correcting Code (ECC) capable of detecting 2-bit errors and correcting 1-bit errors",
          "SEC-DED: Single Error Correction, Double Error Detection"
        ],
        keyFormula: "Total bits required for Hamming Code: 2^r ≥ data_bits + r + 1",
        exampleProblem: {
          title: "Hamming Code Check Bits Calculation",
          problemStatement: "How many check bits (r) are needed for 64 bits of data using Hamming SEC code?",
          steps: [
            "Formula: 2^r ≥ d + r + 1, where d = 64.",
            "Test r = 6: 2^6 = 64. 64 ≥ 64 + 6 + 1 (False: 64 ≥ 71).",
            "Test r = 7: 2^7 = 128. 128 ≥ 64 + 7 + 1 (True: 128 ≥ 72)."
          ],
          finalAnswer: "7 check bits required (total 71 bits for SEC)."
        },
        diagramType: "hierarchy",
        notes: "Explain why modern servers require ECC memory to prevent silent data corruption from alpha particles or cosmic rays."
      }
    ]
  },
  {
    sectionNumber: "5.6",
    chapter: 5,
    title: "Virtual Memory",
    slides: [
      {
        id: "5.6-1",
        sectionNumber: "5.6",
        chapter: 5,
        title: "Virtual Memory & Translation (TLB)",
        subtitle: "Pages, Page Tables, and TLBs",
        bulletPoints: [
          "Virtual Memory maps virtual addresses (seen by CPU) to physical addresses (RAM/Disk)",
          "Page Table: Resident in memory, maps virtual page number (VPN) to physical page number (PPN)",
          "Page Fault: Accessing a page not in RAM causes disk access and heavy penalty (millions of cycles)",
          "TLB (Translation Lookaside Buffer): Specialized hardware cache for fast virtual-to-physical address translation"
        ],
        keyFormula: "Effective Address Translation Time = TLB Hit Time + (TLB Miss Rate × Page Table Walk Penalty)",
        exampleProblem: {
          title: "Virtual Address Translation",
          problemStatement: "Given a 4 KB page size (12-bit offset) and a 32-bit virtual address, how many bits are used for the Virtual Page Number (VPN)?",
          steps: [
            "Page size = 4 KB = 4,096 bytes -> Offset bits = log2(4,096) = 12 bits.",
            "Virtual address width = 32 bits.",
            "VPN bits = Total Virtual Address bits (32) - Offset bits (12) = 20 bits."
          ],
          finalAnswer: "20 bits for VPN (supporting 1M virtual pages)."
        },
        diagramType: "virtual_memory",
        notes: "Highlight how TLB prevents a memory access from requiring two physical memory reads (one for page table, one for data)."
      }
    ]
  },
  {
    sectionNumber: "5.7",
    chapter: 5,
    title: "A Common Framework for Memory Hierarchy",
    slides: [
      {
        id: "5.7-1",
        sectionNumber: "5.7",
        title: "A Common Framework for Memory Hierarchy",
        subtitle: "Unified View: Caches, TLBs, and Virtual Memory",
        bulletPoints: [
          "Four Fundamental Questions for Any Memory Hierarchy Level:",
          "1. Placement: Where can a block be placed? (Direct, Set-Associative, Fully Associative)",
          "2. Identification: How is a block found? (Tag comparison)",
          "3. Replacement: Which block is replaced on a miss? (LRU, Random)",
          "4. Write Policy: How are writes handled? (Write-through vs. Write-back)"
        ],
        keyFormula: "Unified AMAT Framework = Hit Time + (Miss Rate × Miss Penalty)",
        exampleProblem: {
          title: "Comparing Cache vs. Virtual Memory Parameters",
          problemStatement: "Compare block size and miss penalty trade-offs between L1 Caches and Virtual Memory.",
          steps: [
            "L1 Cache: Small blocks (e.g., 64 bytes), small miss penalty (~10-20 cycles), managed in hardware.",
            "Virtual Memory: Large blocks/pages (e.g., 4 KB to 2 MB), massive miss penalty (~millions of cycles / disk access), managed in OS/hardware."
          ],
          finalAnswer: "Both share placement/replacement principles but operate at vastly different timescales."
        },
        diagramType: "hierarchy",
        notes: "Show students that caching concepts apply universally across hardware and OS boundaries."
      }
    ]
  },
  {
    sectionNumber: "5.8",
    chapter: 5,
    title: "Using a Finite-State Machine to Control a Simple Cache",
    slides: [
      {
        id: "5.8-1",
        sectionNumber: "5.8",
        title: "Finite-State Machine (FSM) for Cache Control",
        subtitle: "Implementing Cache Controller Hardware",
        bulletPoints: [
          "Cache Controller manages hits, misses, memory read requests, and CPU stalling",
          "FSM States: 1. Idle (Compare Tag), 2. Read Miss (Fetch from Memory), 3. Writeback (Evict dirty block if needed)",
          "CPU is stalled (PC write disabled) until cache miss is serviced"
        ],
        keyFormula: "Stall Cycles per Miss = Memory Access Latency / CPU Clock Period",
        exampleProblem: {
          title: "FSM State Transition Analysis",
          problemStatement: "A cache controller encounters a read miss on a clean block. How many FSM states does it transition through before returning to Idle?",
          steps: [
            "State 1 (Idle): Tag comparison fails (Miss detected). Transition to Memory Access state.",
            "State 2 (Memory Fetch): Wait for memory bus response and write block into cache. Transition back to Idle.",
            "State 3 (Resume): CPU completes memory read."
          ],
          finalAnswer: "2 main active states (Miss Detection -> Memory Fetch -> Idle)."
        },
        diagramType: "cache",
        notes: "Explain how hardware state machines coordinate asynchronous memory with synchronous CPU pipelines."
      }
    ]
  },
  {
    sectionNumber: "5.9",
    chapter: 5,
    title: "Real-World Examples: Intel Core i7 and ARM Cortex-A53",
    slides: [
      {
        id: "5.9-1",
        sectionNumber: "5.9",
        title: "Real-World Memory Hierarchies",
        subtitle: "Intel Core i7 & ARM Cortex-A53 Case Studies",
        bulletPoints: [
          "Intel Core i7: Multi-level caches (Private 32KB L1 I/D per core, Private 256KB L2 per core, Shared L3 cache up to 20MB+)",
          "ARM Cortex-A53: Designed for energy efficiency, configurable L1/L2 caches, optimized for mobile workloads",
          "Inclusion Policies: Inclusive (L3 contains copies of L1/L2) vs. Exclusive caches"
        ],
        keyFormula: "Total L3 Cache Size = Number of Core Slices × Bank Size",
        exampleProblem: {
          title: "Multi-level Cache AMAT Analysis",
          problemStatement: "Intel Core i7 style hierarchy: L1 hit time = 1ns (miss rate 5%), L2 hit time = 4ns (local miss rate 20%), Main Memory penalty = 100ns. Calculate overall AMAT.",
          steps: [
            "Global L2 miss rate = L1 miss rate × L2 local miss rate = 0.05 × 0.20 = 0.01 (1%).",
            "AMAT = Hit Time_L1 + (Miss Rate_L1 × Hit Time_L2) + (Global Miss Rate_L2 × Memory Penalty)",
            "AMAT = 1ns + (0.05 × 4ns) + (0.01 × 100ns)",
            "AMAT = 1 + 0.2 + 1.0 = 2.2 ns."
          ],
          finalAnswer: "AMAT = 2.2 ns with L2 cache."
        },
        diagramType: "hierarchy",
        notes: "Conclude Chapter 5 by showing how real processors balance power, area, and speed through hierarchical cache design."
      }
    ]
  }
];
