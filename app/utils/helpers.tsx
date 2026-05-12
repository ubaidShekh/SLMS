// utils/helpers.js
export const getStatusColor = (status) => {
  switch (status) {
    case "Offline":
      return "#F59E0B";
    case "In Progress":
      return "#3B82F6";
    case "Working":
      return "#10B981";
    case "Fault":
      return "#EF4444";
    default:
      return "#9CA3AF";
  }
};

export const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "#EF4444";
    case "Medium":
      return "#F59E0B";
    case "Low":
      return "#10B981";
    default:
      return "#9CA3AF";
  }
};

export const generateAssignedTasks = () => [
  {
    _id: "T-001",
    lightId: "L-1002",
    location: "Park Street, Near Metro",
    status: "Pending",
    priority: "High",
    assignedAt: "2024-03-15 10:30 AM",
    description: "Light completely off – electrical fault",
  },
  {
    id: "T-002",
    lightId: "L-1005",
    location: "Industrial Area, Phase 2",
    status: "In Progress",
    priority: "Medium",
    assignedAt: "2024-03-14 02:15 PM",
    description: "Power failure – check transformer",
  },
  {
    id: "T-003",
    lightId: "L-1009",
    location: "University Area, Gate 2",
    status: "Pending",
    priority: "High",
    assignedAt: "2024-03-16 09:00 AM",
    description: "Light flickering – replace ballast",
  },
  {
    id: "T-004",
    lightId: "L-1004",
    location: "Civil Lines, Block C",
    status: "Completed",
    priority: "Low",
    assignedAt: "2024-03-12 11:20 AM",
    description: "Offline – network issue resolved",
  },
  {
    id: "T-005",
    lightId: "L-1008",
    location: "Old City, Jamalpur",
    status: "Pending",
    priority: "Medium",
    assignedAt: "2024-03-16 01:45 PM",
    description: "Light not turning on at night",
  },
];
