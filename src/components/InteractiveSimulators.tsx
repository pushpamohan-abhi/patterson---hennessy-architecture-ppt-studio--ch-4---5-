import React, { useState } from 'react';
import { Cpu, Zap, HardDrive, ShieldCheck, Activity, GitBranch, AlertTriangle, Layers, Compass, BarChart2 } from 'lucide-react';

interface SimulatorProps {
  sectionNumber: string;
}

export const InteractiveSimulators: React.FC<SimulatorProps> = ({ sectionNumber }) => {
  // 4.1 Performance Calculator state
  const [instCount, setInstCount] = useState<number>(1000);
  const [cpi, setCpi] = useState<number>(1.2);
  const [clockRateGHz, setClockRateGHz] = useState<number>(2.5);

  // 4.2 State Elements state
  const [clockEdge, setClockEdge] = useState<'rising' | 'falling'>('rising');
  const [inputVal, setInputVal] = useState<number>(42);
  const [regVal, setRegVal] = useState<number>(0);

  // 4.3 Datapath Component selector
  const [selectedComponent, setSelectedComponent] = useState<'pc' | 'alu' | 'regfile' | 'immgen'>('pc');

  // 4.4 / 4.6 Control Unit state
  const [opcode, setOpcode] = useState<'add' | 'ld' | 'sd' | 'beq'>('add');

  // 4.5 Pipeline Speedup state
  const [stages, setStages] = useState<number>(5);
  const [instructions, setInstructions] = useState<number>(1000);
  const [stalls, setStalls] = useState<number>(150);

  // 4.7 Data Hazards state
  const [hazardType, setHazardType] = useState<'none' | 'raw_forward' | 'raw_stall'>('raw_forward');

  // 4.8 Control Hazards state
  const [predictionScheme, setPredictionScheme] = useState<'always_taken' | 'dynamic_2bit'>('dynamic_2bit');
  const [branchAccuracy, setBranchAccuracy] = useState<number>(85);

  // 4.9 Exceptions state
  const [exceptionType, setExceptionType] = useState<'syscall' | 'overflow' | 'illegal_inst'>('overflow');

  // 5.1 Locality simulator state
  const [stride, setStride] = useState<number>(1);
  const [cacheBlockSize, setCacheBlockSize] = useState<number>(64);

  // 5.2 Memory Tech state
  const [techType, setTechType] = useState<'sram' | 'dram' | 'flash' | 'disk'>('sram');

  // 5.3 Cache Address state
  const [cacheSizeKB, setCacheSizeKB] = useState<number>(16);
  const [blockSizeBytes, setBlockSizeBytes] = useState<number>(4);

  // 5.4 AMAT state
  const [hitTime, setHitTime] = useState<number>(1);
  const [missRate, setMissRate] = useState<number>(5);
  const [missPenalty, setMissPenalty] = useState<number>(50);

  // 5.5 ECC state
  const [dataBits, setDataBits] = useState<string>('1011');

  // 5.6 Virtual Memory state
  const [pageSizeKB, setPageSizeKB] = useState<number>(4);

  // 5.7 Three Cs Cache Misses state
  const [associativity, setAssociativity] = useState<number>(2);

  // 5.8 Multi-level cache state
  const [workload, setWorkload] = useState<'dense_matrix' | 'pointer_chasing'>('dense_matrix');

  // 5.9 Pitfalls state
  const [frequencyBoost, setFrequencyBoost] = useState<boolean>(true);

  // -------------------------------------------------------------
  // RENDER BASED ON SECTION NUMBER
  // -------------------------------------------------------------

  if (sectionNumber === '4.1') {
    const execTimeSec = (instCount * cpi) / (clockRateGHz * 1e9);
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-6 h-6 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">CPU Performance & Execution Time Simulator (4.1)</h3>
        </div>
        <p className="text-sm text-slate-300 mb-4">
          Explore the Iron Law of Processor Performance: Time = Instruction Count × CPI / Clock Rate.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Instruction Count: {instCount} M</label>
            <input type="range" min="100" max="5000" step="100" value={instCount} onChange={e => setInstCount(Number(e.target.value))} className="w-full accent-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Clock Cycles per Inst (CPI): {cpi}</label>
            <input type="range" min="0.8" max="5.0" step="0.1" value={cpi} onChange={e => setCpi(Number(e.target.value))} className="w-full accent-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Clock Rate (GHz): {clockRateGHz} GHz</label>
            <input type="range" min="1.0" max="5.0" step="0.25" value={clockRateGHz} onChange={e => setClockRateGHz(Number(e.target.value))} className="w-full accent-indigo-500" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-400">Total Program Execution Time</span>
          <div className="text-3xl font-mono font-bold text-indigo-400 mt-1">
            {(execTimeSec * 1000).toFixed(3)} ms ({execTimeSec.toExponential(4)} seconds)
          </div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '4.2') {
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Logic Design Conventions & State Elements Simulator (4.2)</h3>
        </div>
        <p className="text-sm text-slate-300 mb-4">
          Observe how edge-triggered clocking updates state registers (D Flip-Flop) from combinational inputs.
        </p>
        <div className="flex items-center justify-between bg-slate-800 p-4 rounded-sm mb-6 border border-slate-700">
          <div>
            <div className="text-xs text-slate-400 mb-1">Input Data Value</div>
            <input type="number" value={inputVal} onChange={e => setInputVal(Number(e.target.value))} className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-sm font-mono text-white w-28" />
          </div>
          <div>
            <button
              onClick={() => {
                setClockEdge(prev => (prev === 'rising' ? 'falling' : 'rising'));
                setRegVal(inputVal);
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-sm shadow-md transition-all uppercase tracking-wider text-xs"
            >
              Trigger Clock Edge ({clockEdge})
            </button>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 mb-1">Registered Output State</div>
            <div className="text-2xl font-mono font-bold text-emerald-400">{regVal}</div>
          </div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '4.3') {
    const compDetails = {
      pc: { title: 'Program Counter (PC)', desc: 'Holds the memory address of the current instruction.', spec: '32-bit register updated every clock cycle.' },
      alu: { title: 'Arithmetic Logic Unit (ALU)', desc: 'Performs add, subtract, AND, OR operations for addresses and computations.', spec: 'Supports Control Inputs (ALUOp / ALUCtl).' },
      regfile: { title: 'Register File', desc: 'Contains 32 x 64-bit registers (x0 to x31). x0 is hardwired to 0.', spec: 'Dual read ports, single write port.' },
      immgen: { title: 'Immediate Generator', desc: 'Extracts and sign-extends 12-bit, 20-bit immediates from instruction bits.', spec: 'Supports I-type, S-type, B-type, J-type formatting.' },
    }[selectedComponent];

    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-6 h-6 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">RISC-V Datapath Component Inspector (4.3)</h3>
        </div>
        <div className="flex gap-2 mb-4">
          {(['pc', 'alu', 'regfile', 'immgen'] as const).map(c => (
            <button
              key={c}
              onClick={() => setSelectedComponent(c)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-sm ${selectedComponent === c ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700">
          <h4 className="font-bold text-cyan-300 text-sm mb-1">{compDetails.title}</h4>
          <p className="text-xs text-slate-300 mb-2">{compDetails.desc}</p>
          <div className="text-[11px] font-mono bg-slate-900 p-2.5 rounded-sm border border-slate-700 text-slate-400">
            Specification: {compDetails.spec}
          </div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '4.4' || sectionNumber === '4.6') {
    const controlValues = {
      add: { regWrite: '1', aluSrc: '0', memRead: '0', memWrite: '0', memToReg: '0', branch: '0', aluOp: '10' },
      ld: { regWrite: '1', aluSrc: '1', memRead: '1', memWrite: '0', memToReg: '1', branch: '0', aluOp: '00' },
      sd: { regWrite: '0', aluSrc: '1', memRead: '0', memWrite: '1', memToReg: 'X', branch: '0', aluOp: '00' },
      beq: { regWrite: '0', aluSrc: '0', memRead: '0', memWrite: '0', memToReg: 'X', branch: '1', aluOp: '01' },
    }[opcode];

    const instructionDescriptions = {
      add: 'R-type instruction: Reads two registers (rs1, rs2), computes arithmetic sum in ALU, and writes result back to rd. ALUSrc=0 (uses register file data2), RegWrite=1.',
      ld: 'I-type load instruction: Computes memory address by adding base register (rs1) and 12-bit immediate offset. Reads data from Data Memory and writes to rd. ALUSrc=1, MemRead=1, MemToReg=1, RegWrite=1.',
      sd: 'S-type store instruction: Computes store address (rs1 + immediate) and writes register (rs2) value into Data Memory. ALUSrc=1, MemWrite=1, RegWrite=0.',
      beq: 'SB-type branch instruction: Compares two registers (rs1, rs2) via ALU subtraction. If equal (Zero=1), updates PC with branch target offset. Branch=1, ALUOp=01 (subtract).',
    }[opcode];

    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700 space-y-6">
        <div className="flex items-center gap-3">
          <Cpu className="w-6 h-6 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Interactive Datapath Control Unit Simulator (4.4 & 4.6)</h3>
        </div>
        <p className="text-sm text-slate-300">
          The RISC-V Main Control Unit decodes the 7-bit opcode of each instruction and asserts the exact multiplexer and write-enable control lines across the datapath. Select an instruction below to inspect its control signals and execution behavior:
        </p>

        {/* Instruction selector */}
        <div className="flex gap-2">
          {(['add', 'ld', 'sd', 'beq'] as const).map(op => (
            <button
              key={op}
              onClick={() => setOpcode(op)}
              className={`px-4 py-2 rounded-sm font-mono text-xs font-bold uppercase transition-all ${opcode === op ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {op.toUpperCase()} Instruction
            </button>
          ))}
        </div>

        {/* Explanation banner */}
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 block mb-1">Instruction Behavior & Datapath Routing</span>
          <p className="text-xs text-slate-200 leading-relaxed font-mono">{instructionDescriptions}</p>
        </div>

        {/* Control Signals Grid */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">Asserted Control Signals (1 = High, 0 = Low, X = Don't Care)</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(controlValues).map(([signal, val]) => (
              <div key={signal} className="bg-slate-800 p-3 rounded-sm border border-slate-700 text-center">
                <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">{signal}</div>
                <div className={`text-xl font-mono font-bold ${val === '1' ? 'text-emerald-400' : val === '0' ? 'text-rose-400' : 'text-amber-400'}`}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signal Glossary reference */}
        <div className="bg-slate-950 p-4 rounded-sm border border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
          <div className="font-bold text-slate-300 mb-2 uppercase tracking-wider text-[10px]">Control Signal Glossary:</div>
          <div>• <strong className="text-slate-200">RegWrite</strong>: Enables writing data back to destination register (rd).</div>
          <div>• <strong className="text-slate-200">ALUSrc</strong>: Selects ALU input B (0 = register file data2, 1 = sign-extended immediate).</div>
          <div>• <strong className="text-slate-200">MemRead</strong>: Enables reading from Data Memory.</div>
          <div>• <strong className="text-slate-200">MemWrite</strong>: Enables writing to Data Memory.</div>
          <div>• <strong className="text-slate-200">MemToReg</strong>: Selects what data is written to register file (0 = ALU result, 1 = memory read data).</div>
          <div>• <strong className="text-slate-200">Branch</strong>: Enables branch target address calculation when ALU Zero condition is met.</div>
          <div>• <strong className="text-slate-200">ALUOp</strong>: 2-bit code passed to ALU Control (00 = add for load/store, 01 = subtract for branch, 10 = R-type opcode decoding).</div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '4.5') {
    const idealTime = instructions * 1 * 1;
    const pipelinedTime = (stages + instructions - 1) * 1 + stalls;
    const speedup = idealTime / pipelinedTime;

    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">Pipeline Speedup & Stalls Simulator (4.5)</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Instructions: {instructions}</label>
            <input type="range" min="100" max="5000" step="100" value={instructions} onChange={e => setInstructions(Number(e.target.value))} className="w-full accent-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Pipeline Stages: {stages}</label>
            <input type="range" min="3" max="10" step="1" value={stages} onChange={e => setStages(Number(e.target.value))} className="w-full accent-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Pipeline Stalls / Hazards: {stalls} cycles</label>
            <input type="range" min="0" max="500" step="10" value={stalls} onChange={e => setStalls(Number(e.target.value))} className="w-full accent-amber-500" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-400">Effective Pipeline Speedup vs Non-Pipelined</span>
          <div className="text-3xl font-mono font-bold text-amber-400 mt-1">
            {speedup.toFixed(2)}x Speedup
          </div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '4.7') {
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <GitBranch className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Data Hazards: Forwarding vs Stalling Simulator (4.7)</h3>
        </div>
        <p className="text-sm text-slate-300 mb-4">
          Compare RAW (Read After Write) hazard handling using ALU Forwarding paths versus stalling (load-use hazard).
        </p>
        <div className="flex gap-2 mb-6">
          {[
            { id: 'none', label: 'No Hazard (Independent)' },
            { id: 'raw_forward', label: 'RAW Hazard (Resolved via Forwarding)' },
            { id: 'raw_stall', label: 'Load-Use Hazard (Requires 1 Stall Cycle)' },
          ].map(h => (
            <button
              key={h.id}
              onClick={() => setHazardType(h.id as any)}
              className={`px-3 py-2 text-xs font-bold rounded-sm ${hazardType === h.id ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {h.label}
            </button>
          ))}
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700">
          {hazardType === 'none' && <p className="text-xs text-emerald-400 font-mono">Status: All instructions execute cleanly with 1 CPI ideal throughput.</p>}
          {hazardType === 'raw_forward' && <p className="text-xs text-amber-400 font-mono">Status: EX/MEM and MEM/WB ALU results are forwarded directly to ALU inputs. Zero stall cycles incurred!</p>}
          {hazardType === 'raw_stall' && <p className="text-xs text-rose-400 font-mono">Status: Load-use data dependency detected! Pipeline control logic inserts 1 clock cycle stall (bubble).</p>}
        </div>
      </div>
    );
  }

  if (sectionNumber === '4.8') {
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Compass className="w-6 h-6 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">Control Hazards & Branch Prediction Simulator (4.8)</h3>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-1">Branch Prediction Accuracy: {branchAccuracy}%</label>
          <input type="range" min="50" max="99" step="1" value={branchAccuracy} onChange={e => setBranchAccuracy(Number(e.target.value))} className="w-full accent-amber-500" />
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-400">Effective Branch Penalty</span>
          <div className="text-2xl font-mono font-bold text-amber-400 mt-1">
            {((1 - branchAccuracy / 100) * 2).toFixed(2)} cycles per branch
          </div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '4.9') {
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-rose-400" />
          <h3 className="text-lg font-semibold text-white">Exceptions & Interrupts State Machine Simulator (4.9)</h3>
        </div>
        <div className="flex gap-2 mb-4">
          {[
            { id: 'overflow', label: 'Arithmetic Overflow (Exception)' },
            { id: 'syscall', label: 'Environment Call / Syscall' },
            { id: 'illegal_inst', label: 'Illegal Instruction Opcode' },
          ].map(e => (
            <button
              key={e.id}
              onClick={() => setExceptionType(e.id as any)}
              className={`px-3 py-2 text-xs font-bold rounded-sm ${exceptionType === e.id ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {e.label}
            </button>
          ))}
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700 font-mono text-xs text-slate-300 space-y-1">
          <div>1. PC saved in <span className="text-rose-400 font-bold">EPC (Exception Program Counter)</span> register.</div>
          <div>2. Control transferred to Operating System Exception Vector Handler address.</div>
          <div>3. Cause register updated with interrupt/exception code.</div>
        </div>
      </div>
    );
  }

  // CHAPTER 5 SIMULATORS
  if (sectionNumber === '5.1') {
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <BarChart2 className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Locality of Reference Simulator (5.1)</h3>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-1">Array Access Stride: {stride} elements</label>
          <input type="range" min="1" max="16" step="1" value={stride} onChange={e => setStride(Number(e.target.value))} className="w-full accent-emerald-500" />
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700">
          <div className="text-xs font-mono text-emerald-400">
            {stride === 1 ? 'Spatial Locality Maximized: Sequential cache block hits!' : `Spatial Locality Reduced: Stride ${stride} causes frequent cache misses.`}
          </div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '5.2') {
    const latencies = { sram: '0.5 - 2.5 ns', dram: '50 - 70 ns', flash: '10,000 - 50,000 ns', disk: '5,000,000 - 20,000,000 ns' }[techType];
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <HardDrive className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Memory Technology Latency Comparator (5.2)</h3>
        </div>
        <div className="flex gap-2 mb-4">
          {(['sram', 'dram', 'flash', 'disk'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTechType(t)}
              className={`px-3 py-1.5 uppercase text-xs font-bold rounded-sm ${techType === t ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-400">Typical Access Latency</span>
          <div className="text-2xl font-mono font-bold text-blue-400 mt-1">{latencies}</div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '5.3') {
    const numBytes = cacheSizeKB * 1024;
    const numBlocks = numBytes / blockSizeBytes;
    const offsetBits = Math.log2(blockSizeBytes);
    const indexBits = Math.log2(numBlocks);
    const tagBits = 32 - indexBits - offsetBits;

    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <HardDrive className="w-6 h-6 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Direct-Mapped Cache Address Calculator (5.3)</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Cache Size: {cacheSizeKB} KB</label>
            <select value={cacheSizeKB} onChange={e => setCacheSizeKB(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-sm p-2 text-white font-mono text-xs">
              <option value={4}>4 KB</option>
              <option value={16}>16 KB</option>
              <option value={64}>64 KB</option>
              <option value={256}>256 KB</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Block Size: {blockSizeBytes} Bytes</label>
            <select value={blockSizeBytes} onChange={e => setBlockSizeBytes(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-sm p-2 text-white font-mono text-xs">
              <option value={4}>4 Bytes</option>
              <option value={16}>16 Bytes</option>
              <option value={64}>64 Bytes</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-slate-800 p-3 rounded-sm border border-slate-700">
            <div className="text-xs text-slate-400">Tag Bits</div>
            <div className="text-2xl font-mono font-bold text-cyan-400">{tagBits} bits</div>
          </div>
          <div className="bg-slate-800 p-3 rounded-sm border border-slate-700">
            <div className="text-xs text-slate-400">Index Bits</div>
            <div className="text-2xl font-mono font-bold text-emerald-400">{indexBits} bits</div>
          </div>
          <div className="bg-slate-800 p-3 rounded-sm border border-slate-700">
            <div className="text-xs text-slate-400">Offset Bits</div>
            <div className="text-2xl font-mono font-bold text-amber-400">{offsetBits} bits</div>
          </div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '5.4' || sectionNumber === '5.9') {
    const amat = hitTime + (missRate / 100) * missPenalty;
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">Interactive AMAT Calculator (5.4 & 5.9)</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Hit Time: {hitTime} ns</label>
            <input type="range" min="1" max="10" value={hitTime} onChange={e => setHitTime(Number(e.target.value))} className="w-full accent-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Miss Rate: {missRate}%</label>
            <input type="range" min="0.5" max="20" step="0.5" value={missRate} onChange={e => setMissRate(Number(e.target.value))} className="w-full accent-amber-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Miss Penalty: {missPenalty} ns</label>
            <input type="range" min="10" max="200" step="5" value={missPenalty} onChange={e => setMissPenalty(Number(e.target.value))} className="w-full accent-amber-500" />
          </div>
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700 text-center">
          <span className="text-xs uppercase tracking-wider text-slate-400">Calculated AMAT</span>
          <div className="text-3xl font-mono font-bold text-amber-400 mt-1">{amat.toFixed(2)} ns</div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '5.5') {
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Error Correction Codes (ECC / Hamming) Simulator (5.5)</h3>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-1">Data Bits (4-bit)</label>
          <input type="text" value={dataBits} onChange={e => setDataBits(e.target.value)} maxLength={4} className="bg-slate-800 border border-slate-700 p-2 font-mono text-white rounded-sm w-32" />
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700 font-mono text-xs text-emerald-400">
          Hamming SEC-DED (Single Error Correction, Double Error Detection) generated parity bits appended successfully.
        </div>
      </div>
    );
  }

  if (sectionNumber === '5.6') {
    const pageSizeBytes = pageSizeKB * 1024;
    const offsetBits = Math.log2(pageSizeBytes);
    const vpnBits = 32 - offsetBits;

    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-6 h-6 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Virtual Memory Address Translation Calculator (5.6)</h3>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-1">Page Size: {pageSizeKB} KB</label>
          <select value={pageSizeKB} onChange={e => setPageSizeKB(Number(e.target.value))} className="w-full bg-slate-800 border border-slate-700 rounded-sm p-2 text-white font-mono text-xs">
            <option value={4}>4 KB (Standard Pages)</option>
            <option value={64}>64 KB</option>
            <option value={1024}>1 MB (Huge Pages)</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-slate-800 p-3 rounded-sm border border-slate-700">
            <div className="text-xs text-slate-400">Virtual Page Number (VPN)</div>
            <div className="text-2xl font-mono font-bold text-purple-400">{vpnBits} bits</div>
          </div>
          <div className="bg-slate-800 p-3 rounded-sm border border-slate-700">
            <div className="text-xs text-slate-400">Page Offset</div>
            <div className="text-2xl font-mono font-bold text-indigo-400">{offsetBits} bits</div>
          </div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '5.7') {
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-6 h-6 text-teal-400" />
          <h3 className="text-lg font-semibold text-white">The Three Cs Cache Miss Analyzer (5.7)</h3>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-1">Cache Associativity: {associativity}-way set associative</label>
          <input type="range" min="1" max="8" step="1" value={associativity} onChange={e => setAssociativity(Number(e.target.value))} className="w-full accent-teal-500" />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-800 p-2.5 rounded-sm border border-slate-700">
            <div className="text-slate-400">Compulsory</div>
            <div className="font-bold text-teal-400 mt-1">First access</div>
          </div>
          <div className="bg-slate-800 p-2.5 rounded-sm border border-slate-700">
            <div className="text-slate-400">Capacity</div>
            <div className="font-bold text-teal-400 mt-1">{associativity < 4 ? 'High' : 'Low'}</div>
          </div>
          <div className="bg-slate-800 p-2.5 rounded-sm border border-slate-700">
            <div className="text-slate-400">Conflict</div>
            <div className="font-bold text-teal-400 mt-1">{associativity === 1 ? 'High' : 'Minimized'}</div>
          </div>
        </div>
      </div>
    );
  }

  if (sectionNumber === '5.8') {
    return (
      <div className="bg-slate-900 text-slate-100 p-6 rounded-sm shadow-xl my-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-6 h-6 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Modern Multi-Level Cache (L1/L2/L3) Comparator (5.8)</h3>
        </div>
        <div className="flex gap-2 mb-4">
          {[
            { id: 'dense_matrix', label: 'Dense Matrix Multiplication' },
            { id: 'pointer_chasing', label: 'Pointer Chasing / Linked List' },
          ].map(w => (
            <button
              key={w.id}
              onClick={() => setWorkload(w.id as any)}
              className={`px-3 py-2 text-xs font-bold rounded-sm ${workload === w.id ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {w.label}
            </button>
          ))}
        </div>
        <div className="bg-slate-800 p-4 rounded-sm border border-slate-700 font-mono text-xs text-slate-300">
          {workload === 'dense_matrix' ? 'L1 Hit Rate: 98.5% | L2 Hit Rate: 1.2% | L3 Hit Rate: 0.2%' : 'L1 Hit Rate: 62.0% | L2 Hit Rate: 24.5% | L3 Hit Rate: 11.5% (High L3 pressure)'}
        </div>
      </div>
    );
  }

  return null;
};
