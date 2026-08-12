// ===================================================================
// 1. 정적 데이터
// ===================================================================
const PRODUCT_TYPES = [
  { id: 'fund', label: '펀드' },
  { id: 'els', label: 'ELS/ELB' },
  { id: 'bond', label: '채권' },
  { id: 'trust', label: '신탁' }
];

const SCRIPTS = {
  fund: {
    title: '펀드 상품 고지 스크립트',
    body: [
      '본 상품은 예금자보호법에 따라 보호되는 상품이 아니며, 운용 실적에 따라 투자원금의 손실이 발생할 수 있습니다. 과거의 운용 수익률은 미래의 수익률을 보장하지 않습니다.',
      '투자 전 반드시 투자설명서(간이투자설명서)를 충분히 읽어보시기 바라며, 투자목적·투자기간·위험감내수준에 적합한 상품인지 판매직원과 함께 확인하시기 바랍니다.',
      '환매 신청 시 기준가격 적용일 및 환매대금 지급일이 상품별로 다를 수 있으니 환매 소요기간을 사전에 확인하시고, 판매수수료·운용보수 등 총보수·비용은 투자설명서에서 확인하시기 바랍니다.'
    ]
  },
  els: {
    title: 'ELS/ELB 상품 고지 스크립트',
    body: [
      '이 상품은 기초자산 가격에 연동되어 수익구조가 결정되는 파생결합증권으로, 기초자산이 특정 수준(낙인, Knock-In) 이하로 하락한 이후 만기까지 회복되지 않을 경우 원금손실이 발생할 수 있으며, 손실 규모는 기초자산 하락률에 따라 커질 수 있습니다.',
      '조기상환 조건을 충족하지 못하면 투자자금이 만기까지 상환되지 않을 수 있으며, 만기 이전에 중도 환매를 신청할 경우 시장가격에 따라 원금보다 낮은 금액을 받을 수 있습니다.',
      '본 상품(ELB 제외)은 예금자보호법에 따른 보호 대상이 아니며, 발행회사의 신용위험(부도 등)이 발생할 경우 원금 전액 손실 가능성이 있습니다.'
    ]
  },
  bond: {
    title: '채권 상품 고지 스크립트',
    body: [
      '채권은 발행기관에 대한 신용위험을 내포하고 있으며, 발행기관의 신용등급 하락이나 부도 등 신용사건이 발생할 경우 원금 및 이자를 받지 못할 수 있습니다.',
      '만기 전 중도매도 시 시장금리 변동에 따라 채권가격이 하락하여 매입가격보다 낮은 금액에 매도될 수 있으며, 이 경우 손실이 발생할 수 있습니다.',
      '후순위채·신종자본증권 등 특수한 구조의 채권은 만기연장, 이자지급유예 등 일반 채권과 다른 조건이 있을 수 있으니 반드시 상품구조를 확인하시기 바랍니다. 채권은 예금자보호법에 따른 보호 대상이 아닙니다.'
    ]
  },
  trust: {
    title: '신탁 상품 고지 스크립트',
    body: [
      '신탁상품은 은행 예금과 달리 예금자보호법에 따른 보호를 받지 않으며, 신탁재산의 운용 결과에 따른 손익은 모두 위탁자(고객)에게 귀속됩니다.',
      '운용대상 자산의 가격 변동, 신용사건 등에 따라 신탁원본에 손실이 발생할 수 있으며, 원금 및 수익이 보장되지 않습니다.',
      '중도해지 시 수수료가 부과되거나 불리한 가격으로 정산될 수 있으니 계약기간과 중도해지 조건을 사전에 확인하시기 바랍니다.'
    ]
  }
};

const CHECKLISTS = {
  fund: [
    { id: 'fund_suitability', text: '투자자성향(적합성) 확인 완료 여부' },
    { id: 'fund_unsuitable_form', text: '부적합 상품 가입 시 부적합확인서 서명 안내' },
    { id: 'fund_strategy', text: '투자목적·운용전략·주요 투자대상자산 설명' },
    { id: 'fund_loss_risk', text: '원금손실 가능성 및 과거수익률이 미래수익률을 보장하지 않는다는 점 고지' },
    { id: 'fund_fees', text: '판매수수료·운용보수 등 총비용 설명' },
    { id: 'fund_redemption', text: '환매방법 및 환매 소요기간(T+n일) 안내' },
    { id: 'fund_prospectus', text: '(간이)투자설명서 제공·열람 안내' },
    { id: 'fund_no_protection', text: '예금자보호법 비대상 고지' }
  ],
  els: [
    { id: 'els_suitability', text: '투자성향·적합성 확인(부적합 시 경고 및 확인서 안내)' },
    { id: 'els_structure', text: '기초자산 및 조기·만기상환 조건(낙인 포함) 설명' },
    { id: 'els_no_principal', text: '원금비보장형 상품임을 고지(ELB는 원금보장 여부 별도 안내)' },
    { id: 'els_knockin', text: '낙인(Knock-In) 발생 시 원금손실 가능성·손실규모 예시 설명' },
    { id: 'els_lockup', text: '조기상환 미충족 시 자금이 만기까지 묶일 수 있음을 고지' },
    { id: 'els_credit_risk', text: '발행회사 신용위험 및 예금자보호 비대상 고지' },
    { id: 'els_early_redeem', text: '중도상환 시 불리한 가격 적용 가능성 고지' }
  ],
  bond: [
    { id: 'bond_credit', text: '발행기관 신용등급 및 신용위험 설명' },
    { id: 'bond_type', text: '채권 종류(회사채/금융채/후순위채/신종자본증권 등) 및 특징 설명' },
    { id: 'bond_terms', text: '만기일·이자지급방식·세후 실수익률 안내' },
    { id: 'bond_market_risk', text: '중도매도 시 시장가격 변동에 따른 손실 가능성 및 예금자보호 비대상 고지' },
    { id: 'bond_special', text: '후순위채·영구채 등 특수조건(만기연장·이자지급유예) 존재 시 별도 설명' },
    { id: 'bond_rating_change', text: '신용등급 하락 시 가격변동 위험 고지' }
  ],
  trust: [
    { id: 'trust_scope', text: '신탁상품 운용대상 및 운용방법(특정금전신탁 등) 설명' },
    { id: 'trust_no_protection', text: '신탁은 예금이 아니며 예금자보호 비대상임을 고지' },
    { id: 'trust_profit_loss', text: '운용결과에 따른 손익이 고객에게 귀속됨(원금손실 가능성 포함) 고지' },
    { id: 'trust_fees', text: '신탁 수수료 및 중도해지 수수료 설명' },
    { id: 'trust_suitability', text: '투자자성향·적합성 확인' },
    { id: 'trust_term', text: '계약기간 및 중도해지 불이익 안내' }
  ]
};

// ===================================================================
// 2. 유틸리티
// ===================================================================
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

function generateId() {
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// 연속 입력 중 콜백 실행을 지연시켜 매 키 입력마다 재렌더되는 것을 방지
function debounce(fn, delayMs) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}

function formatDateTime(isoString) {
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function getProductLabel(productTypeId) {
  const type = PRODUCT_TYPES.find((t) => t.id === productTypeId);
  return type ? type.label : '미선택';
}

const SESSION_STATUS_LABELS = {
  in_progress: '진행중',
  completed: '완료',
  cancelled: '취소'
};

// ===================================================================
// 2-2. 다크모드 토글 (UI 표시 설정 — 상담 데이터가 아니므로 localStorage에 저장해도 무방)
// ===================================================================
const THEME_STORAGE_KEY = 'pb_compliance_app::theme';

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');

  const syncButton = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    toggleBtn.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
    toggleBtn.title = toggleBtn.getAttribute('aria-label');
  };

  syncButton();

  toggleBtn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch (e) {
      // localStorage를 쓸 수 없는 환경(프라이빗 모드 등)이어도 화면 전환 자체는 계속 동작해야 한다
    }
    syncButton();
  });
}

// ===================================================================
// 3. Supabase 저장소 계층
// ===================================================================
// 이 앱은 로그인 기능이 없는 내부용 도구라 publishable(anon) 키를 그대로 클라이언트에 둔다.
// 즉 이 키를 아는 사람은 누구나 상담 데이터를 읽고 쓸 수 있다 — 실제 고객 데이터를
// 다루려면 Supabase Auth + RLS 정책으로 사용자별 접근 제어를 반드시 추가해야 한다.
const SUPABASE_URL = 'https://urnfiqtowzdtikhzbjtr.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_w9sdK4I-MR2412o4nYfvVQ_hM_j7D7h';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const SESSIONS_TABLE = 'consultation_sessions';

function rowToSession(row) {
  return {
    id: row.id,
    customerAlias: row.customer_alias || '',
    productTypeId: row.product_type_id,
    checklist: row.checklist || {},
    notes: row.notes || '',
    status: row.status || 'in_progress',
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function sessionToRow(session) {
  return {
    id: session.id,
    customer_alias: session.customerAlias,
    product_type_id: session.productTypeId,
    checklist: session.checklist,
    notes: session.notes,
    status: session.status,
    created_at: session.createdAt,
    updated_at: session.updatedAt
  };
}

async function loadSessions() {
  const { data, error } = await supabaseClient
    .from(SESSIONS_TABLE)
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data.map(rowToSession);
}

async function getSession(id) {
  const { data, error } = await supabaseClient
    .from(SESSIONS_TABLE)
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToSession(data) : null;
}

// session을 id 기준으로 upsert(있으면 교체, 없으면 추가). 실패해도 화면 흐름은 막지 않고 로그만 남긴다.
async function upsertSession(session) {
  const { error } = await supabaseClient.from(SESSIONS_TABLE).upsert(sessionToRow(session));
  if (error) console.error('세션 저장 실패:', error);
  return session;
}

// 세션 필드 변경 후 updatedAt 갱신 + 저장까지 한 번에 처리
async function touchAndSaveSession(session) {
  session.updatedAt = new Date().toISOString();
  await upsertSession(session);
}

// 세션 삭제 (연결된 session_audit_log 행은 FK on delete cascade로 함께 삭제됨)
async function deleteSession(id) {
  const { error } = await supabaseClient.from(SESSIONS_TABLE).delete().eq('id', id);
  if (error) throw error;
}

async function createSession() {
  const now = new Date().toISOString();
  const session = {
    id: generateId(),
    customerAlias: '',
    productTypeId: null,
    checklist: {},
    notes: '',
    status: 'in_progress',
    createdAt: now,
    updatedAt: now
  };
  await upsertSession(session);
  await logAuditEvent(session.id, 'session_created', {});
  return session;
}

// 상담 상태(진행중/완료/취소) 변경 + 변경 이력 기록을 함께 처리
async function updateSessionStatus(session, newStatus) {
  const prevStatus = session.status;
  session.status = newStatus;
  await touchAndSaveSession(session);
  await logAuditEvent(session.id, 'status_changed', { from: prevStatus, to: newStatus });
}

// ===================================================================
// 4. 감사 로그 (컴플라이언스: 체크리스트·상태 변경 이력)
// ===================================================================
const AUDIT_LOG_TABLE = 'session_audit_log';

// 로그 기록 실패는 상담 진행 자체를 막지 않도록 에러만 남긴다
async function logAuditEvent(sessionId, eventType, detail) {
  const { error } = await supabaseClient
    .from(AUDIT_LOG_TABLE)
    .insert({ session_id: sessionId, event_type: eventType, detail: detail || {} });
  if (error) console.error('감사 로그 기록 실패:', error);
}

async function loadAuditLog(sessionId) {
  const { data, error } = await supabaseClient
    .from(AUDIT_LOG_TABLE)
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

function describeAuditEvent(log) {
  const d = log.detail || {};
  if (log.event_type === 'status_changed') {
    return `상태 변경: ${SESSION_STATUS_LABELS[d.from] || d.from || '없음'} → ${SESSION_STATUS_LABELS[d.to] || d.to}`;
  }
  if (log.event_type === 'checklist_item_changed') {
    return `'${d.item_text || d.item_id}' ${d.checked ? '체크' : '체크 해제'}`;
  }
  if (log.event_type === 'session_created') {
    return '상담 세션 생성';
  }
  return log.event_type;
}

// ===================================================================
// 4-2. 커스텀 스크립트 저장소 계층 (PB가 직접 등록하는 고지 스크립트)
// ===================================================================
const CUSTOM_SCRIPTS_TABLE = 'custom_scripts';

function rowToCustomScript(row) {
  return {
    id: row.id,
    productTypeId: row.product_type_id,
    title: row.title,
    body: row.body,
    createdAt: row.created_at
  };
}

async function loadCustomScripts(productTypeId) {
  let query = supabaseClient
    .from(CUSTOM_SCRIPTS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });
  if (productTypeId) query = query.eq('product_type_id', productTypeId);
  const { data, error } = await query;
  if (error) throw error;
  return data.map(rowToCustomScript);
}

async function createCustomScript({ productTypeId, title, body }) {
  const row = { id: generateId(), product_type_id: productTypeId, title, body };
  const { error } = await supabaseClient.from(CUSTOM_SCRIPTS_TABLE).insert(row);
  if (error) throw error;
}

async function deleteCustomScript(id) {
  const { error } = await supabaseClient.from(CUSTOM_SCRIPTS_TABLE).delete().eq('id', id);
  if (error) throw error;
}

// ===================================================================
// 5. 화면 전환
// ===================================================================
const state = {
  currentView: 'landing',
  activeSessionId: null,
  activeSession: null,
  dashboardSearch: '',
  dashboardStatusFilter: 'all'
};

// 라이브러리 화면의 "나만의 스크립트 등록" 폼에서 현재 선택된 상품유형
let customScriptFormTypeId = PRODUCT_TYPES[0].id;

function showView(viewId) {
  document.querySelectorAll('.view').forEach((section) => {
    section.classList.add('hidden');
  });
  document.getElementById(`view-${viewId}`).classList.remove('hidden');

  document.querySelectorAll('.app-nav button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.nav === viewId);
  });

  document.getElementById('app-nav').classList.toggle('hidden', viewId === 'landing');

  state.currentView = viewId;

  if (viewId === 'library') {
    renderLibrary();
  } else if (viewId === 'dashboard') {
    renderDashboard();
  } else if (viewId === 'consultation') {
    renderConsultation();
  }
}

// 화면 이동 + URL 해시 갱신(브라우저 히스토리 항목 생성) — 사용자가 클릭으로 이동할 때 사용
function navigateTo(viewId, sessionId) {
  const targetHash = viewId === 'consultation' && sessionId
    ? `#consultation/${sessionId}`
    : `#${viewId}`;

  if (location.hash === targetHash) {
    // 해시가 이미 동일하면 hashchange가 발생하지 않으므로 직접 렌더링
    if (viewId === 'consultation' && sessionId) {
      state.activeSessionId = sessionId;
    }
    showView(viewId);
  } else {
    location.hash = targetHash;
  }
}

// 히스토리 항목을 남기지 않고 화면만 교정할 때 사용 (예: 잘못된 세션으로 진입 시 리다이렉트)
function replaceView(viewId) {
  history.replaceState(null, '', `#${viewId}`);
  showView(viewId);
}

// 뒤로가기/앞으로가기 시 브라우저가 발생시키는 hashchange를 받아 화면을 복원
function handleHashChange() {
  const hash = location.hash.replace(/^#/, '');
  const [viewId, sessionId] = hash.split('/');

  if (viewId === 'consultation' && sessionId) {
    state.activeSessionId = sessionId;
  }
  showView(viewId || 'landing');
}

// ===================================================================
// 6. 렌더 함수
// ===================================================================

// 상담화면·라이브러리 화면 공용: 특정 상품유형의 고지 스크립트를 targetEl에 렌더링
// (내장 스크립트 + 해당 상품유형에 등록된 PB 커스텀 스크립트를 함께 보여준다)
async function renderScriptPanel(productTypeId, targetEl) {
  const script = SCRIPTS[productTypeId];
  if (!script) {
    targetEl.innerHTML = '<p class="empty">상품유형을 선택하면 고지 스크립트가 표시됩니다.</p>';
    return;
  }
  const paragraphs = script.body.map((p) => `<p>${escapeHtml(p)}</p>`).join('');
  targetEl.innerHTML = `<h4>${escapeHtml(script.title)}</h4>${paragraphs}<div class="custom-script-inline" data-role="custom-scripts"></div>`;

  const customContainer = targetEl.querySelector('[data-role="custom-scripts"]');
  try {
    const customScripts = await loadCustomScripts(productTypeId);
    if (customScripts.length === 0) {
      customContainer.innerHTML = '';
      return;
    }
    customContainer.innerHTML = `<h4>PB 등록 스크립트</h4>${customScripts.map((s) =>
      `<p><strong>${escapeHtml(s.title)}</strong><br>${escapeHtml(s.body)}</p>`
    ).join('')}`;
  } catch (e) {
    console.error('커스텀 스크립트 조회 실패:', e);
    customContainer.innerHTML = '';
  }
}

async function renderDashboard() {
  const container = document.getElementById('session-list');
  container.innerHTML = '<p class="empty">불러오는 중...</p>';

  const term = state.dashboardSearch.trim();
  let sessions;
  try {
    sessions = await loadSessions();
  } catch (e) {
    console.error('세션 목록 조회 실패:', e);
    container.innerHTML = '<p class="empty">서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.</p>';
    return;
  }

  if (term) {
    sessions = sessions.filter((s) => s.customerAlias.includes(term));
  }
  if (state.dashboardStatusFilter !== 'all') {
    sessions = sessions.filter((s) => s.status === state.dashboardStatusFilter);
  }

  if (sessions.length === 0) {
    container.innerHTML = (term || state.dashboardStatusFilter !== 'all')
      ? '<p class="empty">검색 결과가 없습니다.</p>'
      : '<p class="empty">저장된 상담이 없습니다.</p>';
    return;
  }

  container.innerHTML = sessions.map((s) => {
    const alias = s.customerAlias || '(고객명 미입력)';
    const items = CHECKLISTS[s.productTypeId];
    const total = items ? items.length : 0;
    const done = items ? items.filter((item) => s.checklist[item.id]).length : 0;
    const progressLabel = total > 0 ? `${done}/${total} 완료` : '상품유형 미선택';
    const progressPct = total > 0 ? Math.round((done / total) * 100) : 0;
    const statusLabel = SESSION_STATUS_LABELS[s.status] || s.status;
    return `<div class="session-row" data-id="${escapeHtml(s.id)}">
      <span class="session-date">${formatDateTime(s.updatedAt)}</span>
      <span class="session-alias">${escapeHtml(alias)}</span>
      <span class="badge">${escapeHtml(getProductLabel(s.productTypeId))}</span>
      <span class="status-badge status-${escapeHtml(s.status)}">${escapeHtml(statusLabel)}</span>
      <span class="session-progress">
        <span class="progress-track"><span class="progress-fill" style="width:${progressPct}%"></span></span>
        ${escapeHtml(progressLabel)}
      </span>
      <button type="button" class="btn-outline-pill btn-outline-pill-danger btn-pill-sm session-delete-btn" data-delete-id="${escapeHtml(s.id)}">삭제</button>
    </div>`;
  }).join('');

  container.querySelectorAll('.session-row').forEach((row) => {
    row.addEventListener('click', () => {
      navigateTo('consultation', row.dataset.id);
    });
  });

  container.querySelectorAll('.session-delete-btn').forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!confirm('이 상담 내역을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.')) return;
      btn.disabled = true;
      try {
        await deleteSession(btn.dataset.deleteId);
        await renderDashboard();
      } catch (err) {
        console.error('세션 삭제 실패:', err);
        alert('삭제에 실패했습니다.');
        btn.disabled = false;
      }
    });
  });
}

async function renderConsultation() {
  let session;
  try {
    session = await getSession(state.activeSessionId);
  } catch (e) {
    console.error('세션 조회 실패:', e);
    replaceView('dashboard');
    return;
  }
  if (!session) {
    // 세션이 없으면(예: 삭제되었거나 잘못된 id) 대시보드로 되돌아간다 (히스토리에 남기지 않음)
    replaceView('dashboard');
    return;
  }

  state.activeSession = session;

  const statusBadge = document.getElementById('session-status-badge');
  statusBadge.textContent = SESSION_STATUS_LABELS[session.status] || session.status;
  statusBadge.className = `status-badge status-${session.status}`;

  // 세션을 새로 열 때마다 변경 이력 패널은 접힌 상태로 초기화한다 (이전 세션의 내용이 남지 않도록)
  document.getElementById('history-panel').hidden = true;
  document.getElementById('history-list').innerHTML = '';

  // 텍스트 입력은 매 키 입력마다 저장하지 않고 타이핑이 멈췄을 때만 저장한다
  const debouncedSave = debounce(() => touchAndSaveSession(session), 500);

  const aliasEl = document.getElementById('alias-input');
  aliasEl.value = session.customerAlias;
  aliasEl.oninput = () => {
    session.customerAlias = aliasEl.value;
    debouncedSave();
  };

  const picker = document.getElementById('product-type-picker');
  picker.innerHTML = PRODUCT_TYPES.map((type) =>
    `<button type="button" class="type-btn ${type.id === session.productTypeId ? 'active' : ''}" data-type="${type.id}">${escapeHtml(type.label)}</button>`
  ).join('');

  picker.querySelectorAll('.type-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      session.productTypeId = btn.dataset.type;
      picker.querySelectorAll('.type-btn').forEach((b) => b.classList.toggle('active', b === btn));
      renderChecklist(session);
      renderScriptPanel(session.productTypeId, document.getElementById('consultation-script-panel'));
      touchAndSaveSession(session);
    });
  });

  renderChecklist(session);
  renderScriptPanel(session.productTypeId, document.getElementById('consultation-script-panel'));

  const notesEl = document.getElementById('notes-textarea');
  notesEl.value = session.notes;
  notesEl.oninput = () => {
    session.notes = notesEl.value;
    debouncedSave();
  };
}

function renderChecklist(session) {
  const container = document.getElementById('checklist-container');
  const items = CHECKLISTS[session.productTypeId];

  if (!items) {
    container.innerHTML = '<li class="empty">상품유형을 먼저 선택하세요.</li>';
    return;
  }

  container.innerHTML = items.map((item) => {
    const checked = !!session.checklist[item.id];
    return `<li class="checklist-item">
      <label>
        <input type="checkbox" data-item-id="${item.id}" ${checked ? 'checked' : ''}>
        <span>${escapeHtml(item.text)}</span>
      </label>
    </li>`;
  }).join('');

  container.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    cb.addEventListener('change', () => {
      session.checklist[cb.dataset.itemId] = cb.checked;
      touchAndSaveSession(session);
      const item = items.find((i) => i.id === cb.dataset.itemId);
      logAuditEvent(session.id, 'checklist_item_changed', {
        item_id: cb.dataset.itemId,
        item_text: item ? item.text : cb.dataset.itemId,
        checked: cb.checked
      });
    });
  });
}

// 상담화면의 "변경 이력" 패널 채우기
async function renderHistoryPanel(sessionId) {
  const list = document.getElementById('history-list');
  list.innerHTML = '<li class="empty">불러오는 중...</li>';
  let logs;
  try {
    logs = await loadAuditLog(sessionId);
  } catch (e) {
    console.error('변경 이력 조회 실패:', e);
    list.innerHTML = '<li class="empty">이력을 불러올 수 없습니다.</li>';
    return;
  }
  if (logs.length === 0) {
    list.innerHTML = '<li class="empty">변경 이력이 없습니다.</li>';
    return;
  }
  list.innerHTML = logs.map((log) =>
    `<li class="history-item"><span class="history-time">${formatDateTime(log.created_at)}</span>${escapeHtml(describeAuditEvent(log))}</li>`
  ).join('');
}

// 상담 요약을 인쇄 전용 영역(#print-summary)에 채워 넣는다
function buildPrintSummary(session) {
  const items = CHECKLISTS[session.productTypeId] || [];
  const checklistHtml = items.length
    ? `<ul>${items.map((item) =>
        `<li>${session.checklist[item.id] ? '☑' : '☐'} ${escapeHtml(item.text)}</li>`
      ).join('')}</ul>`
    : '<p>선택된 상품유형이 없습니다.</p>';

  document.getElementById('print-summary').innerHTML = `
    <h2>상담 기록 요약</h2>
    <div class="print-meta">
      <p>고객명(별칭): ${escapeHtml(session.customerAlias || '(미입력)')}</p>
      <p>상품유형: ${escapeHtml(getProductLabel(session.productTypeId))}</p>
      <p>상태: ${escapeHtml(SESSION_STATUS_LABELS[session.status] || session.status)}</p>
      <p>작성일시: ${formatDateTime(session.createdAt)} / 최종수정: ${formatDateTime(session.updatedAt)}</p>
    </div>
    <h3>체크리스트</h3>
    ${checklistHtml}
    <h3>상담 메모</h3>
    <div class="notes-block">${escapeHtml(session.notes || '(작성된 메모 없음)')}</div>
    <p class="print-footer">출력일시: ${formatDateTime(new Date().toISOString())}</p>
  `;
}

function renderLibrary() {
  const container = document.getElementById('library-content');
  container.innerHTML = PRODUCT_TYPES.map((type) =>
    `<article class="script-card">
      <h3>${escapeHtml(type.label)}</h3>
      <div class="script-body" id="script-body-${type.id}"></div>
    </article>`
  ).join('');

  PRODUCT_TYPES.forEach((type) => {
    renderScriptPanel(type.id, document.getElementById(`script-body-${type.id}`));
  });

  renderCustomScriptTypePicker();
  renderCustomScriptList();
}

function renderCustomScriptTypePicker() {
  const picker = document.getElementById('custom-script-type-picker');
  picker.innerHTML = PRODUCT_TYPES.map((type) =>
    `<button type="button" class="type-btn ${type.id === customScriptFormTypeId ? 'active' : ''}" data-type="${type.id}">${escapeHtml(type.label)}</button>`
  ).join('');

  picker.querySelectorAll('.type-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      customScriptFormTypeId = btn.dataset.type;
      picker.querySelectorAll('.type-btn').forEach((b) => b.classList.toggle('active', b === btn));
    });
  });
}

async function renderCustomScriptList() {
  const container = document.getElementById('custom-script-list');
  container.innerHTML = '<p class="empty">불러오는 중...</p>';

  let scripts;
  try {
    scripts = await loadCustomScripts();
  } catch (e) {
    console.error('커스텀 스크립트 조회 실패:', e);
    container.innerHTML = '<p class="empty">등록된 스크립트를 불러올 수 없습니다.</p>';
    return;
  }

  if (scripts.length === 0) {
    container.innerHTML = '<p class="empty">등록된 나만의 스크립트가 없습니다.</p>';
    return;
  }

  container.innerHTML = scripts.map((s) => `
    <article class="script-card custom-script-card">
      <div class="section-row">
        <h3>${escapeHtml(s.title)} <span class="badge">${escapeHtml(getProductLabel(s.productTypeId))}</span></h3>
        <button type="button" class="btn-outline-pill btn-outline-pill-danger btn-pill-sm" data-delete-id="${escapeHtml(s.id)}">삭제</button>
      </div>
      <p>${escapeHtml(s.body)}</p>
    </article>
  `).join('');

  container.querySelectorAll('[data-delete-id]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!confirm('이 스크립트를 삭제하시겠습니까?')) return;
      btn.disabled = true;
      try {
        await deleteCustomScript(btn.dataset.deleteId);
        await renderCustomScriptList();
      } catch (e) {
        console.error('스크립트 삭제 실패:', e);
        alert('삭제에 실패했습니다.');
        btn.disabled = false;
      }
    });
  });
}

// 랜딩페이지 카드/클로징 섹션이 스크롤로 화면에 들어오면 서서히 나타나게 한다 (한 번 나타난 뒤에는 유지)
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => observer.observe(el));
}

// ===================================================================
// 8. 초기화
// ===================================================================
function init() {
  document.querySelectorAll('.app-nav button').forEach((btn) => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.nav));
  });
  document.getElementById('new-session-btn').addEventListener('click', async () => {
    const btn = document.getElementById('new-session-btn');
    btn.disabled = true;
    try {
      const session = await createSession();
      navigateTo('consultation', session.id);
    } finally {
      btn.disabled = false;
    }
  });
  document.getElementById('back-to-dashboard-btn').addEventListener('click', () => {
    navigateTo('dashboard');
  });
  const debouncedSearchRender = debounce(() => renderDashboard(), 200);
  document.getElementById('session-search').addEventListener('input', (e) => {
    state.dashboardSearch = e.target.value;
    debouncedSearchRender();
  });
  document.getElementById('session-status-filter').addEventListener('change', (e) => {
    state.dashboardStatusFilter = e.target.value;
    renderDashboard();
  });

  // 상담 완료/취소/인쇄/변경이력 버튼은 상담화면 재렌더 때마다 다시 만들어지는 DOM이 아니므로
  // (중복 바인딩을 피하기 위해) init()에서 한 번만 바인딩하고, 대상 세션은 state.activeSession으로 참조한다
  document.getElementById('complete-session-btn').addEventListener('click', async () => {
    const session = state.activeSession;
    if (!session) return;
    await updateSessionStatus(session, 'completed');
    navigateTo('dashboard');
  });
  document.getElementById('cancel-session-btn').addEventListener('click', async () => {
    const session = state.activeSession;
    if (!session) return;
    if (!confirm('이 상담을 취소 처리하시겠습니까?')) return;
    await updateSessionStatus(session, 'cancelled');
    navigateTo('dashboard');
  });
  document.getElementById('history-toggle-btn').addEventListener('click', () => {
    const panel = document.getElementById('history-panel');
    panel.hidden = !panel.hidden;
    if (!panel.hidden && state.activeSession) {
      renderHistoryPanel(state.activeSession.id);
    }
  });
  document.getElementById('print-summary-btn').addEventListener('click', () => {
    if (!state.activeSession) return;
    buildPrintSummary(state.activeSession);
    window.print();
  });

  document.getElementById('custom-script-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const titleEl = document.getElementById('custom-script-title');
    const bodyEl = document.getElementById('custom-script-body');
    const title = titleEl.value.trim();
    const body = bodyEl.value.trim();
    if (!title || !body) return;

    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    try {
      await createCustomScript({ productTypeId: customScriptFormTypeId, title, body });
      titleEl.value = '';
      bodyEl.value = '';
      await renderCustomScriptList();
    } catch (err) {
      console.error('스크립트 등록 실패:', err);
      alert('등록에 실패했습니다.');
    } finally {
      submitBtn.disabled = false;
    }
  });

  document.getElementById('brand-link').addEventListener('click', () => {
    navigateTo('landing');
  });
  document.getElementById('landing-cta-btn').addEventListener('click', () => {
    navigateTo('dashboard');
  });
  document.getElementById('landing-cta-btn-2').addEventListener('click', () => {
    navigateTo('dashboard');
  });

  window.addEventListener('hashchange', handleHashChange);

  if (location.hash) {
    handleHashChange();
  } else {
    showView('landing');
  }

  initScrollReveal();
  initThemeToggle();
}

document.addEventListener('DOMContentLoaded', init);
