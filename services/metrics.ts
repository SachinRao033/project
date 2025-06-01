// Define system metric types
interface SystemMetric {
  usage: number;
  status: 'normal' | 'warning' | 'critical';
  history: number[];
}

interface SystemMetrics {
  cpu: SystemMetric & { cores: number };
  memory: SystemMetric & { total: string; used: string };
  disk: SystemMetric & { total: string; used: string };
  network: {
    throughput: number;
    status: 'normal' | 'warning' | 'critical';
    history: number[];
    upload: string;
    download: string;
  };
}

// Generate random metric within range
const generateRandomMetric = (min: number, max: number, warningThreshold: number, criticalThreshold: number): SystemMetric => {
  const usage = Number((Math.random() * (max - min) + min).toFixed(1));
  
  let status: 'normal' | 'warning' | 'critical' = 'normal';
  if (usage >= criticalThreshold) {
    status = 'critical';
  } else if (usage >= warningThreshold) {
    status = 'warning';
  }
  
  // Generate history data (last 10 points)
  const history = Array(10).fill(0).map(() => {
    return Number((Math.random() * (max - min) + min).toFixed(1));
  });
  
  return {
    usage,
    status,
    history,
  };
};

// Format bytes to human-readable format
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get system metrics (mock implementation)
export const getSystemMetrics = async (): Promise<SystemMetrics> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // CPU metrics
  const cpuMetric = generateRandomMetric(20, 95, 70, 85);
  
  // Memory metrics
  const memoryMetric = generateRandomMetric(30, 90, 75, 90);
  const totalMemory = 16 * 1024 * 1024 * 1024; // 16 GB
  const usedMemory = totalMemory * (memoryMetric.usage / 100);
  
  // Disk metrics
  const diskMetric = generateRandomMetric(40, 95, 80, 90);
  const totalDisk = 512 * 1024 * 1024 * 1024; // 512 GB
  const usedDisk = totalDisk * (diskMetric.usage / 100);
  
  // Network metrics
  const networkThroughput = Number((Math.random() * 10).toFixed(1));
  const networkStatus = networkThroughput > 8 ? 'warning' : (networkThroughput > 9 ? 'critical' : 'normal');
  const networkHistory = Array(10).fill(0).map(() => Number((Math.random() * 10).toFixed(1)));
  const uploadSpeed = formatBytes(Math.random() * 1024 * 1024) + '/s';
  const downloadSpeed = formatBytes(Math.random() * 5 * 1024 * 1024) + '/s';
  
  return {
    cpu: {
      ...cpuMetric,
      cores: 8,
    },
    memory: {
      ...memoryMetric,
      total: formatBytes(totalMemory),
      used: formatBytes(usedMemory),
    },
    disk: {
      ...diskMetric,
      total: formatBytes(totalDisk),
      used: formatBytes(usedDisk),
    },
    network: {
      throughput: networkThroughput,
      status: networkStatus,
      history: networkHistory,
      upload: uploadSpeed,
      download: downloadSpeed,
    },
  };
};