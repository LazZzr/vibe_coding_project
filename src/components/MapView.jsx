import { MapContainer, TileLayer, Marker, Popup, LayersControl, ScaleControl, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RiskBadge, PriorityBadge } from '@/components/Badges';

// Fix default icon paths for bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const RISK_COLORS = {
  Critical: '#dc2626',
  High: '#ea580c',
  Moderate: '#ca8a04',
  Low: '#16a34a',
};

function createRiskIcon(level) {
  const color = RISK_COLORS[level] || '#64748b';
  return L.divIcon({
    className: 'custom-risk-marker',
    html: `<div style="width:18px;height:18px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -9],
  });
}

function createSiteIcon() {
  return L.divIcon({
    className: 'custom-site-marker',
    html: `<div style="width:20px;height:20px;background:#2563eb;border:2px solid white;border-radius:4px;box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });
}

function MapResizer() {
  const map = useMap();
  setTimeout(() => map.invalidateSize(), 100);
  return null;
}

const { BaseLayer, Overlay } = LayersControl;

export default function MapView({
  habitations = [],
  relocationSites = [],
  center = [30.0, 79.0],
  zoom = 8,
  height = '500px',
  showLayers = true,
  showSites = false,
  className = '',
}) {
  const responsiveHeight = typeof height === 'string' && height.endsWith('px')
    ? { minHeight: '300px', height }
    : { height };
  return (
    <div className={`relative rounded-lg overflow-hidden border border-slate-200 ${className}`} style={responsiveHeight}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <MapResizer />
        <ScaleControl position="bottomleft" />

        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
          </BaseLayer>
          <BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; Esri'
            />
          </BaseLayer>
          <BaseLayer name="Terrain">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenTopoMap (CC-BY-SA)'
            />
          </BaseLayer>

          {showLayers && (
            <>
              <Overlay name="Flood Zones">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" opacity={0} />
              </Overlay>
            </>
          )}
        </LayersControl>

        {/* Habitation markers */}
        {habitations.map((h) => (
          <Marker key={h.id} position={h.coords} icon={createRiskIcon(h.riskLevel)}>
            <Popup>
              <div className="min-w-[200px]">
                <p className="font-semibold text-slate-800 text-sm">{h.name}</p>
                <p className="text-xs text-slate-500 mb-2">District: {h.district}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Population:</span><span className="font-medium">{h.population.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Primary Hazard:</span><span className="font-medium">{h.hazard}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Risk Score:</span><span className="font-medium">{h.riskScore}/100</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Vulnerability:</span><RiskBadge level={h.vulnerability === 'Very High' ? 'Critical' : h.vulnerability} /></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Capacity:</span><span className="text-xs font-medium text-orange-600">{h.capacityStatus}</span></div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Relocation Priority:</p>
                  <PriorityBadge priority={h.priority} />
                </div>
                <Link
                  to={`/habitations/${h.id}`}
                  className="mt-2 block text-center text-xs font-medium text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded py-1.5 transition-colors"
                >
                  View Full Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Relocation site markers */}
        {showSites && relocationSites.map((s) => (
          <Marker key={`site-${s.id}`} position={s.coords} icon={createSiteIcon()}>
            <Popup>
              <div className="min-w-[180px]">
                <p className="font-semibold text-slate-800 text-sm">{s.name}</p>
                <p className="text-xs text-slate-500 mb-2">District: {s.district}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Capacity:</span><span className="font-medium">{s.capacity.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Available:</span><span className="font-medium text-green-600">{s.available.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Suitability:</span><span className="font-medium">{s.suitability}</span></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
