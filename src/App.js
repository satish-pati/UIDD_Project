import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, ArrowRight, Download, Shield, Lock, Globe, Zap } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const ComplianceEngine = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentLayer, setCurrentLayer] = useState(0);

  // Mock compliance data for each layer
  const layersData = [
    {
      name: 'Privacy & Policy Layer',
      icon: <Lock className="w-8 h-8" />,
      score: 78,
      checks: [
        { name: 'SPDI compliance', status: 'pass', score: 85 },
        { name: 'ABDM HDM checks', status: 'pass', score: 75 },
        { name: 'Consent availability', status: 'warning', score: 70 },
        { name: 'Patient rights (view/export)', status: 'pass', score: 82 }
      ],
      radarData: [
        { subject: 'SPDI', score: 85, fullMark: 100 },
        { subject: 'ABDM HDM', score: 75, fullMark: 100 },
        { subject: 'Consent', score: 70, fullMark: 100 },
        { subject: 'Patient Rights', score: 82, fullMark: 100 }
      ],
      findings: [
        { severity: 'medium', message: 'Consent logs missing for 3 patient records', fix: 'Implement consent tracking for all patient data access' },
        { severity: 'low', message: 'Export functionality lacks JSON format option', fix: 'Add JSON export capability to patient portal' }
      ]
    },
    {
      name: 'Interoperability Layer',
      icon: <Globe className="w-8 h-8" />,
      score: 85,
      checks: [
        { name: 'FHIR structure + ABDM profiles', status: 'pass', score: 92 },
        { name: 'ICD/SNOMED/LOINC correctness', status: 'pass', score: 88 },
        { name: 'DICOM conformance', status: 'pass', score: 75 }
      ],
      radarData: [
        { subject: 'FHIR/ABDM', score: 92, fullMark: 100 },
        { subject: 'ICD/SNOMED', score: 88, fullMark: 100 },
        { subject: 'DICOM', score: 75, fullMark: 100 }
      ],
      findings: [
        { severity: 'low', message: 'DICOM metadata incomplete in 2 imaging studies', fix: 'Ensure all required DICOM tags are populated' }
      ]
    },
    {
      name: 'Security Layer',
      icon: <Shield className="w-8 h-8" />,
      score: 72,
      checks: [
        { name: 'Access control', status: 'pass', score: 80 },
        { name: 'Authentication/authorization', status: 'pass', score: 85 },
        { name: 'Encryption standards', status: 'warning', score: 65 },
        { name: 'ISO 27001-style checks', status: 'warning', score: 70 },
        { name: 'Audit log completeness', status: 'pass', score: 75 }
      ],
      radarData: [
        { subject: 'Access Control', score: 80, fullMark: 100 },
        { subject: 'Auth', score: 85, fullMark: 100 },
        { subject: 'Encryption', score: 65, fullMark: 100 },
        { subject: 'ISO 27001', score: 70, fullMark: 100 },
        { subject: 'Audit Logs', score: 75, fullMark: 100 }
      ],
      findings: [
        { severity: 'high', message: 'Data at rest not encrypted using AES-256', fix: 'Implement AES-256 encryption for database storage' },
        { severity: 'medium', message: 'Password policy allows weak passwords', fix: 'Enforce minimum 12 characters with complexity requirements' }
      ]
    },
    {
      name: 'ABDM Integration Layer',
      icon: <Zap className="w-8 h-8" />,
      score: 88,
      checks: [
        { name: 'API schema correctness', status: 'pass', score: 95 },
        { name: 'Consent artefact correctness', status: 'pass', score: 90 },
        { name: 'Gateway encryption rules', status: 'pass', score: 85 },
        { name: 'ABHA identifier formats', status: 'pass', score: 88 },
        { name: 'HPR/HFR referencing rules', status: 'pass', score: 82 }
      ],
      radarData: [
        { subject: 'API Schema', score: 95, fullMark: 100 },
        { subject: 'Consent', score: 90, fullMark: 100 },
        { subject: 'Encryption', score: 85, fullMark: 100 },
        { subject: 'ABHA', score: 88, fullMark: 100 },
        { subject: 'HPR/HFR', score: 82, fullMark: 100 }
      ],
      findings: [
        { severity: 'low', message: 'Some HPR references use outdated format', fix: 'Update HPR reference format to latest ABDM specification' }
      ]
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const startAnalysis = () => {
    if (uploadedFile) {
      setCurrentScreen('layer');
      setCurrentLayer(0);
    }
  };

  const nextLayer = () => {
    if (currentLayer < layersData.length - 1) {
      setCurrentLayer(currentLayer + 1);
    } else {
      setCurrentScreen('final');
    }
  };

  const resetApp = () => {
    setCurrentScreen('home');
    setUploadedFile(null);
    setCurrentLayer(0);
  };

  // Home Screen
  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-16 h-16 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">EHR Compliance Engine</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Multi-Layer Compliance Checker for Health Data Systems
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">About This Tool</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Privacy & Policy
              </h3>
              <p className="text-sm text-gray-700">SPDI, ABDM HDM, consent management, and patient rights compliance</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Interoperability
              </h3>
              <p className="text-sm text-gray-700">FHIR, ICD/SNOMED/LOINC, and DICOM standard conformance</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security
              </h3>
              <p className="text-sm text-gray-700">Access control, encryption, ISO 27001, and audit logging</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-3 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                ABDM Integration
              </h3>
              <p className="text-sm text-gray-700">API schemas, consent artefacts, and ABHA identifier validation</p>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-all duration-300">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload EHR Document</h3>
            <p className="text-gray-500 mb-6">Supported formats: PDF, Word, JSON, XML</p>
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.json,.xml"
            />
            <label
              htmlFor="file-upload"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Choose File
            </label>
            {uploadedFile && (
              <div className="mt-4 flex items-center justify-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">{uploadedFile.name}</span>
              </div>
            )}
          </div>

          {uploadedFile && (
            <button
              onClick={startAnalysis}
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
            >
              Start Compliance Analysis
              <ArrowRight className="w-6 h-6 ml-2" />
            </button>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>This tool assists compliance but does not replace legal advice or official certification.</p>
        </div>
      </div>
    </div>
  );

  // Layer Analysis Screen
  const LayerScreen = () => {
    const layer = layersData[currentLayer];
    const canProceed = layer.score >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-4xl font-bold text-gray-900 flex items-center">
                {layer.icon}
                <span className="ml-4">{layer.name}</span>
              </h1>
              <div className="text-right">
                <div className="text-sm text-gray-500">Overall Score</div>
                <div className={`text-4xl font-bold ${layer.score >= 80 ? 'text-green-600' : layer.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {layer.score}%
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {layersData.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 flex-1 rounded-full ${idx <= currentLayer ? 'bg-blue-600' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Radar Chart */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Compliance Radar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={layer.radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                  <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Heat Map */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Compliance Heat Map</h3>
              <div className="space-y-3">
                {layer.checks.map((check, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center flex-1">
                      {check.status === 'pass' ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      ) : check.status === 'warning' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mr-3" />
                      )}
                      <span className="text-sm font-medium text-gray-700">{check.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 rounded-full mr-3 overflow-hidden">
                        <div
                          className={`h-full ${check.score >= 80 ? 'bg-green-500' : check.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${check.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 w-12 text-right">{check.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance Index */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Compliance Index</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                <div className="text-sm text-blue-700 font-medium mb-1">Total Checks</div>
                <div className="text-3xl font-bold text-blue-900">{layer.checks.length}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                <div className="text-sm text-green-700 font-medium mb-1">Passed</div>
                <div className="text-3xl font-bold text-green-900">
                  {layer.checks.filter(c => c.status === 'pass').length}
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                <div className="text-sm text-yellow-700 font-medium mb-1">Warnings</div>
                <div className="text-3xl font-bold text-yellow-900">
                  {layer.checks.filter(c => c.status === 'warning').length}
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                <div className="text-sm text-red-700 font-medium mb-1">Failed</div>
                <div className="text-3xl font-bold text-red-900">
                  {layer.checks.filter(c => c.status === 'fail').length}
                </div>
              </div>
            </div>
          </div>

          {/* Findings & Remediation */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Findings & Remediation</h3>
            <div className="space-y-4">
              {layer.findings.map((finding, idx) => (
                <div
                  key={idx}
                  className={`border-l-4 p-4 rounded-r-lg ${
                    finding.severity === 'high'
                      ? 'border-red-500 bg-red-50'
                      : finding.severity === 'medium'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start">
                    <AlertCircle
                      className={`w-5 h-5 mr-3 mt-0.5 ${
                        finding.severity === 'high'
                          ? 'text-red-600'
                          : finding.severity === 'medium'
                          ? 'text-yellow-600'
                          : 'text-blue-600'
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            finding.severity === 'high'
                              ? 'bg-red-200 text-red-800'
                              : finding.severity === 'medium'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-blue-200 text-blue-800'
                          }`}
                        >
                          {finding.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-medium text-gray-800 mb-2">{finding.message}</p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Remediation:</span> {finding.fix}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={resetApp}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel Analysis
            </button>
            {canProceed ? (
              <button
                onClick={nextLayer}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center"
              >
                {currentLayer < layersData.length - 1 ? 'Next Layer' : 'Generate Final Report'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <div className="text-right">
                <div className="text-red-600 font-semibold mb-2">Score below threshold (70%)</div>
                <button
                  onClick={nextLayer}
                  className="px-8 py-3 bg-gray-400 text-white rounded-lg font-semibold cursor-not-allowed"
                  disabled
                >
                  Cannot Proceed
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Final Report Screen
  const FinalScreen = () => {
    const overallScore = Math.round(layersData.reduce((sum, layer) => sum + layer.score, 0) / layersData.length);
    const totalChecks = layersData.reduce((sum, layer) => sum + layer.checks.length, 0);
    const passedChecks = layersData.reduce(
      (sum, layer) => sum + layer.checks.filter(c => c.status === 'pass').length,
      0
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Compliance Analysis Complete</h1>
            <p className="text-xl text-gray-600">Multi-layer assessment successfully completed</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overall Compliance Summary</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <div className="text-sm text-blue-700 font-medium mb-2">Overall Score</div>
                <div className={`text-5xl font-bold mb-2 ${overallScore >= 80 ? 'text-green-600' : overallScore >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {overallScore}%
                </div>
                <div className="text-sm text-gray-600">Across all layers</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <div className="text-sm text-green-700 font-medium mb-2">Checks Passed</div>
                <div className="text-5xl font-bold text-green-900 mb-2">
                  {passedChecks}/{totalChecks}
                </div>
                <div className="text-sm text-gray-600">{Math.round((passedChecks / totalChecks) * 100)}% success rate</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                <div className="text-sm text-purple-700 font-medium mb-2">ABDM Readiness</div>
                <div className="text-5xl font-bold text-purple-900 mb-2">
                  {layersData[3].score}%
                </div>
                <div className="text-sm text-gray-600">Integration ready</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {layersData.map((layer, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="mr-4">{layer.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{layer.name}</h3>
                        <div className="text-sm text-gray-500">{layer.checks.length} checks performed</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${layer.score >= 80 ? 'text-green-600' : layer.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {layer.score}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${layer.score >= 80 ? 'bg-green-500' : layer.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${layer.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Recommendations</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Implement AES-256 encryption for data at rest (Security Layer)</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Add consent tracking for all patient data access (Privacy & Policy Layer)</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Update HPR reference format to latest ABDM specification (ABDM Integration Layer)</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetApp}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Start New Analysis
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'layer' && <LayerScreen />}
      {currentScreen === 'final' && <FinalScreen />}
    </>
  );
};

export default ComplianceEngine;