// ============================================================
// API Service — Future Backend Integration Placeholder
//
// These functions currently return demo data. When the Python
// FastAPI backend is ready, replace the mock returns with actual
// fetch calls to the endpoints documented below.
//
// Planned endpoints:
//   GET /api/habitations
//   GET /api/habitations/:id
//   GET /api/risk-map
//   GET /api/risk-score
//   GET /api/capacity-score
//   GET /api/relocation-priority
//   GET /api/relocation-sites
//   GET /api/analytics
// ============================================================

import {
  HABITATIONS,
  RELOCATION_SITES,
  getRelocationRanking,
  getHabitationById,
  IS_DEMO,
} from '@/data/demoData';

const API_BASE = '/api'; // Future: import.meta.env.VITE_API_BASE

function mockResponse(data, delay = 200) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data, isDemo: true }), delay);
  });
}

export async function fetchHabitations() {
  // return fetch(`${API_BASE}/habitations`).then(r => r.json());
  return mockResponse(HABITATIONS);
}

export async function fetchHabitationById(id) {
  // return fetch(`${API_BASE}/habitations/${id}`).then(r => r.json());
  return mockResponse(getHabitationById(id));
}

export async function fetchRiskMapData() {
  // return fetch(`${API_BASE}/risk-map`).then(r => r.json());
  return mockResponse(HABITATIONS);
}

export async function fetchRelocationPriority() {
  // return fetch(`${API_BASE}/relocation-priority`).then(r => r.json());
  return mockResponse(getRelocationRanking());
}

export async function fetchRelocationSites() {
  // return fetch(`${API_BASE}/relocation-sites`).then(r => r.json());
  return mockResponse(RELOCATION_SITES);
}

export async function fetchAnalytics() {
  // return fetch(`${API_BASE}/analytics`).then(r => r.json());
  const riskDistribution = { Low: 0, Moderate: 0, High: 0, Critical: 0 };
  const hazardDistribution = { Flood: 0, Landslide: 0, Erosion: 0 };
  const priorityDistribution = { Immediate: 0, 'Short-Term': 0, 'Medium-Term': 0, Monitor: 0 };
  const capacityDistribution = { Adequate: 0, Warning: 0, Deficit: 0, 'Critical Deficit': 0 };

  HABITATIONS.forEach((h) => {
    riskDistribution[h.riskLevel]++;
    hazardDistribution[h.hazard]++;
    priorityDistribution[h.priority]++;
    capacityDistribution[h.capacityStatus]++;
  });

  const populationByDistrict = {};
  HABITATIONS.forEach((h) => {
    populationByDistrict[h.district] = (populationByDistrict[h.district] || 0) + h.population;
  });

  return mockResponse({
    riskDistribution,
    hazardDistribution,
    priorityDistribution,
    capacityDistribution,
    populationByDistrict,
  });
}

export const DEMO_MODE = IS_DEMO;
