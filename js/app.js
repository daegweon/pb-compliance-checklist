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
// publishable(anon) 키는 공개되어도 안전하도록 설계된 키다. 실제 접근 제어는
// Supabase Auth(로그인) + 테이블의 RLS 정책(사용자별 조회/수정 제한)이 담당한다.
// flowType을 pkce로 지정해 OAuth 로그인 후 리다이렉트가 "?code=..." 쿼리 파라미터로 오도록 한다
// (기본 implicit 플로우는 "#access_token=..." 형태의 URL 해시를 쓰는데, 이 앱은 해시를 라우팅에
// 사용하고 있어 그대로 두면 로그인 콜백과 화면 전환 로직이 충돌한다).
const SUPABASE_URL = 'https://urnfiqtowzdtikhzbjtr.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_w9sdK4I-MR2412o4nYfvVQ_hM_j7D7h';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { flowType: 'pkce' }
});

// ===================================================================
// 3-0. 인증 (Supabase Auth: Google 로그인)
// ===================================================================
async function getCurrentUser() {
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) return null;
  return data.user;
}

// Google 로그인 화면으로 리다이렉트한다 (성공/실패 결과는 페이지가 돌아온 뒤 onAuthStateChange로 전달됨)
async function signInWithGoogle() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
  if (error) throw error;
}

async function signOutCurrentUser() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;
}

// Supabase Auth 에러 메시지를 사용자에게 보여줄 문구로 변환
function describeAuthError(err) {
  return (err && err.message) || '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
}

const SESSIONS_TABLE = 'consultation_sessions';

function rowToSession(row) {
  return {
    id: row.id,
    userId: row.user_id,
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
    user_id: session.userId,
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
  const user = await getCurrentUser();
  if (!user) throw new Error('로그인이 필요합니다.');

  const now = new Date().toISOString();
  const session = {
    id: generateId(),
    userId: user.id,
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
  currentUser: null,
  activeSessionId: null,
  activeSession: null,
  dashboardSearch: '',
  dashboardStatusFilter: 'all'
};

// 라이브러리 화면의 "나만의 스크립트 등록" 폼에서 현재 선택된 상품유형
let customScriptFormTypeId = PRODUCT_TYPES[0].id;

const AUTH_REQUIRED_VIEWS = ['dashboard', 'consultation', 'library'];

function showView(viewId) {
  // 로그인이 필요한 화면인데 로그인되어 있지 않으면 로그인 화면으로, 반대로 이미 로그인된 상태에서
  // 로그인 화면에 들어오면 대시보드로 보낸다 (URL 해시도 실제 표시되는 화면과 맞춰준다)
  if (AUTH_REQUIRED_VIEWS.includes(viewId) && !state.currentUser) {
    if (location.hash !== '#auth') history.replaceState(null, '', '#auth');
    viewId = 'auth';
  } else if (viewId === 'auth' && state.currentUser) {
    if (location.hash !== '#dashboard') history.replaceState(null, '', '#dashboard');
    viewId = 'dashboard';
  }

  document.querySelectorAll('.view').forEach((section) => {
    section.classList.add('hidden');
  });
  document.getElementById(`view-${viewId}`).classList.remove('hidden');

  document.querySelectorAll('.app-nav button').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.nav === viewId);
  });

  document.getElementById('app-nav').classList.toggle('hidden', viewId === 'landing' || viewId === 'auth');

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

// 대시보드 목록·CSV 내보내기가 동일한 검색/필터 기준을 공유하도록 분리
function filterSessions(sessions, { search, status }) {
  let result = sessions;
  if (search) {
    result = result.filter((s) => s.customerAlias.includes(search));
  }
  if (status !== 'all') {
    result = result.filter((s) => s.status === status);
  }
  return result;
}

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=일, 1=월, ...
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diffToMonday);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameLocalDate(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// 대시보드 요약 통계: 오늘 상담 건수 / 이번 주 완료율 / 진행중 건수 / 상품유형별 분포
function computeDashboardStats(sessions) {
  const now = new Date();
  const weekStart = startOfWeek(now);

  const todayCount = sessions.filter((s) => isSameLocalDate(new Date(s.createdAt), now)).length;

  const thisWeekSessions = sessions.filter((s) => new Date(s.createdAt) >= weekStart);
  const thisWeekCompleted = thisWeekSessions.filter((s) => s.status === 'completed').length;
  const completionRate = thisWeekSessions.length > 0
    ? Math.round((thisWeekCompleted / thisWeekSessions.length) * 100)
    : 0;

  const inProgressCount = sessions.filter((s) => s.status === 'in_progress').length;

  // 완료로 표시됐지만 해당 상품유형의 체크리스트를 다 채우지 않은 세션 (불완전판매 리스크)
  const incompleteCompletedCount = sessions.filter((s) => isIncompleteCompletion(s)).length;

  const productBreakdown = PRODUCT_TYPES.map((type) => ({
    label: type.label,
    count: sessions.filter((s) => s.productTypeId === type.id).length
  }));
  const unselectedCount = sessions.filter((s) => !s.productTypeId).length;

  return {
    todayCount,
    completionRate,
    thisWeekCompleted,
    thisWeekTotal: thisWeekSessions.length,
    inProgressCount,
    incompleteCompletedCount,
    productBreakdown,
    unselectedCount
  };
}

// 완료 처리된 상담인데 체크리스트가 100% 채워지지 않은 경우를 판별한다
function isIncompleteCompletion(session) {
  if (session.status !== 'completed') return false;
  const items = CHECKLISTS[session.productTypeId];
  if (!items || items.length === 0) return false;
  const done = items.filter((item) => session.checklist[item.id]).length;
  return done < items.length;
}

function renderDashboardStats(sessions) {
  const container = document.getElementById('dashboard-stats');
  if (sessions.length === 0) {
    container.innerHTML = '';
    return;
  }

  const stats = computeDashboardStats(sessions);
  const breakdownParts = stats.productBreakdown.map((p) => `<span>${escapeHtml(p.label)} ${p.count}</span>`);
  if (stats.unselectedCount > 0) {
    breakdownParts.push(`<span>미선택 ${stats.unselectedCount}</span>`);
  }

  container.innerHTML = `
    <div class="stat-card">
      <span class="stat-label">오늘 상담</span>
      <span class="stat-value">${stats.todayCount}건</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">이번 주 완료율</span>
      <span class="stat-value">${stats.completionRate}%</span>
      <span class="stat-sub">${stats.thisWeekCompleted}/${stats.thisWeekTotal}건</span>
    </div>
    <div class="stat-card">
      <span class="stat-label">진행중 상담</span>
      <span class="stat-value">${stats.inProgressCount}건</span>
    </div>
    <div class="stat-card${stats.incompleteCompletedCount > 0 ? ' stat-card-warning' : ''}">
      <span class="stat-label">체크리스트 미이행 경보</span>
      <span class="stat-value">${stats.incompleteCompletedCount}건</span>
    </div>
    <div class="stat-card stat-card-wide">
      <span class="stat-label">상품유형별 분포</span>
      <div class="stat-breakdown">${breakdownParts.join('')}</div>
    </div>
  `;
}

// CSV 값 이스케이프: 쉼표·따옴표·줄바꿈이 포함되면 큰따옴표로 감싼다
function toCsvValue(value) {
  const str = String(value ?? '');
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function buildSessionsCsv(sessions) {
  const header = ['생성일시', '수정일시', '고객명(별칭)', '상품유형', '상태', '체크리스트 완료율', '메모'];
  const rows = sessions.map((s) => {
    const items = CHECKLISTS[s.productTypeId];
    const total = items ? items.length : 0;
    const done = items ? items.filter((item) => s.checklist[item.id]).length : 0;
    const progress = total > 0 ? `${done}/${total}` : '-';
    return [
      formatDateTime(s.createdAt),
      formatDateTime(s.updatedAt),
      s.customerAlias || '',
      getProductLabel(s.productTypeId),
      SESSION_STATUS_LABELS[s.status] || s.status,
      progress,
      s.notes || ''
    ];
  });
  return [header, ...rows].map((row) => row.map(toCsvValue).join(',')).join('\r\n');
}

// 엑셀에서 한글이 깨지지 않도록 UTF-8 BOM을 붙여 다운로드한다
function downloadCsv(filename, csvContent) {
  const BOM = '﻿';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

async function renderDashboard() {
  const container = document.getElementById('session-list');
  container.innerHTML = '<p class="empty">불러오는 중...</p>';

  const term = state.dashboardSearch.trim();
  let allSessions;
  try {
    allSessions = await loadSessions();
  } catch (e) {
    console.error('세션 목록 조회 실패:', e);
    container.innerHTML = '<p class="empty">서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.</p>';
    document.getElementById('dashboard-stats').innerHTML = '';
    return;
  }

  renderDashboardStats(allSessions);

  const sessions = filterSessions(allSessions, { search: term, status: state.dashboardStatusFilter });

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
    const incompleteWarning = isIncompleteCompletion(s);
    return `<div class="session-row${incompleteWarning ? ' session-row-warning' : ''}" data-id="${escapeHtml(s.id)}">
      <span class="session-date">${formatDateTime(s.updatedAt)}</span>
      <span class="session-alias">${escapeHtml(alias)}</span>
      <span class="badge">${escapeHtml(getProductLabel(s.productTypeId))}</span>
      <label class="session-complete-check" title="완료 처리">
        <input type="checkbox" class="session-complete-checkbox" data-id="${escapeHtml(s.id)}" ${s.status === 'completed' ? 'checked' : ''}>
        완료
      </label>
      <span class="status-badge status-${escapeHtml(s.status)}">${escapeHtml(statusLabel)}</span>
      ${incompleteWarning ? `<span class="incomplete-warning-badge" title="완료 처리됐지만 체크리스트가 100% 채워지지 않았습니다">⚠ 미이행 경보</span>` : ''}
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

  container.querySelectorAll('.session-complete-checkbox').forEach((cb) => {
    const session = sessions.find((s) => s.id === cb.dataset.id);
    cb.addEventListener('click', (e) => e.stopPropagation());
    cb.addEventListener('change', async () => {
      if (!session) return;
      cb.disabled = true;
      try {
        await updateSessionStatus(session, cb.checked ? 'completed' : 'in_progress');
        await renderDashboard();
      } catch (err) {
        console.error('완료 상태 변경 실패:', err);
        alert('완료 상태 변경에 실패했습니다.');
        await renderDashboard();
      }
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

  // 세션을 새로 열 때마다 변경 이력 패널은 접힌 상태로, 검색·필터도 초기화한다 (이전 세션의 내용이 남지 않도록)
  document.getElementById('history-panel').hidden = true;
  document.getElementById('history-list').innerHTML = '';
  document.getElementById('history-search').value = '';
  document.getElementById('history-type-filter').value = 'all';
  currentHistoryLogs = [];

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
      const newType = btn.dataset.type;
      if (newType === session.productTypeId) return;

      // 현재 표시된 체크리스트에 하나라도 체크된 항목이 있으면 실수로 초기화되지 않도록 확인을 받는다
      const currentItems = CHECKLISTS[session.productTypeId];
      const hasChecked = !!currentItems && currentItems.some((item) => session.checklist[item.id]);
      if (hasChecked && !confirm('체크리스트에 확인된 내용이 있습니다. 변경하시겠습니까?')) {
        return;
      }

      session.productTypeId = newType;
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

// 현재 열려 있는 세션의 변경 이력 원본(필터 적용 전)을 담아둔다 — 검색어·항목 필터를 바꿀 때마다 다시 조회하지 않기 위함
let currentHistoryLogs = [];

// 검색어(이력 설명 텍스트 포함 여부)와 항목 유형으로 변경 이력을 좁힌다
function filterHistoryLogs(logs, search, eventType) {
  const term = search.trim().toLowerCase();
  return logs.filter((log) => {
    if (eventType !== 'all' && log.event_type !== eventType) return false;
    if (term && !describeAuditEvent(log).toLowerCase().includes(term)) return false;
    return true;
  });
}

// 필터링된 변경 이력 목록을 그려준다
function renderHistoryList(logs) {
  const list = document.getElementById('history-list');
  if (currentHistoryLogs.length === 0) {
    list.innerHTML = '<li class="empty">변경 이력이 없습니다.</li>';
    return;
  }
  if (logs.length === 0) {
    list.innerHTML = '<li class="empty">검색 결과가 없습니다.</li>';
    return;
  }
  list.innerHTML = logs.map((log) =>
    `<li class="history-item"><span class="history-time">${formatDateTime(log.created_at)}</span>${escapeHtml(describeAuditEvent(log))}</li>`
  ).join('');
}

// 현재 필터 입력값 기준으로 캐시된 이력을 다시 그린다
function applyHistoryFilters() {
  const search = document.getElementById('history-search').value;
  const eventType = document.getElementById('history-type-filter').value;
  renderHistoryList(filterHistoryLogs(currentHistoryLogs, search, eventType));
}

// 상담화면의 "변경 이력" 패널 채우기
async function renderHistoryPanel(sessionId) {
  const list = document.getElementById('history-list');
  list.innerHTML = '<li class="empty">불러오는 중...</li>';
  try {
    currentHistoryLogs = await loadAuditLog(sessionId);
  } catch (e) {
    console.error('변경 이력 조회 실패:', e);
    currentHistoryLogs = [];
    list.innerHTML = '<li class="empty">이력을 불러올 수 없습니다.</li>';
    return;
  }
  applyHistoryFilters();
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

// 헤더의 사용자 이메일 표시·로그인/로그아웃 버튼을 로그인 상태에 맞춰 켜고 끈다
function updateAuthHeader() {
  const emailEl = document.getElementById('user-email-display');
  const logoutBtn = document.getElementById('logout-btn');
  const loginBtn = document.getElementById('header-login-btn');
  if (state.currentUser) {
    emailEl.textContent = state.currentUser.email;
    emailEl.hidden = false;
    logoutBtn.hidden = false;
    loginBtn.hidden = true;
  } else {
    emailEl.textContent = '';
    emailEl.hidden = true;
    logoutBtn.hidden = true;
    loginBtn.hidden = false;
  }
}

// ===================================================================
// 8. 초기화
// ===================================================================
async function init() {
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
  document.getElementById('export-csv-btn').addEventListener('click', async () => {
    const btn = document.getElementById('export-csv-btn');
    btn.disabled = true;
    try {
      const allSessions = await loadSessions();
      const sessions = filterSessions(allSessions, {
        search: state.dashboardSearch.trim(),
        status: state.dashboardStatusFilter
      });
      if (sessions.length === 0) {
        alert('내보낼 상담 내역이 없습니다.');
        return;
      }
      const csv = buildSessionsCsv(sessions);
      const dateStr = formatDateTime(new Date().toISOString()).slice(0, 10);
      downloadCsv(`상담목록_${dateStr}.csv`, csv);
    } catch (e) {
      console.error('CSV 내보내기 실패:', e);
      alert('상담 목록을 불러오지 못해 CSV로 내보낼 수 없습니다.');
    } finally {
      btn.disabled = false;
    }
  });

  // 인쇄/변경이력/완료/취소 버튼은 상담화면 재렌더 때마다 다시 만들어지는 DOM이 아니므로
  // (중복 바인딩을 피하기 위해) init()에서 한 번만 바인딩하고, 대상 세션은 state.activeSession으로 참조한다
  document.getElementById('complete-consultation-btn').addEventListener('click', async () => {
    const session = state.activeSession;
    if (!session) return;
    const btn = document.getElementById('complete-consultation-btn');
    btn.disabled = true;
    try {
      // 디바운스된 자동저장을 기다리지 않고, 현재까지 입력된 내용을 즉시 저장한 뒤 완료 처리한다
      await updateSessionStatus(session, 'completed');
      navigateTo('dashboard');
    } finally {
      btn.disabled = false;
    }
  });
  document.getElementById('cancel-consultation-btn').addEventListener('click', () => {
    navigateTo('dashboard');
  });
  document.getElementById('history-toggle-btn').addEventListener('click', () => {
    const panel = document.getElementById('history-panel');
    panel.hidden = !panel.hidden;
    if (!panel.hidden && state.activeSession) {
      renderHistoryPanel(state.activeSession.id);
    }
  });
  document.getElementById('history-search').addEventListener('input', debounce(applyHistoryFilters, 200));
  document.getElementById('history-type-filter').addEventListener('change', applyHistoryFilters);
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

  // Google 로그인
  document.getElementById('google-signin-btn').addEventListener('click', async () => {
    const btn = document.getElementById('google-signin-btn');
    const messageEl = document.getElementById('auth-message');
    messageEl.hidden = true;
    btn.disabled = true;
    try {
      await signInWithGoogle();
      // 성공 시 이 시점에서 브라우저가 Google 로그인 화면으로 이동하므로 아래 코드는 보통 실행되지 않는다
    } catch (err) {
      console.error('Google 로그인 실패:', err);
      messageEl.textContent = describeAuthError(err);
      messageEl.hidden = false;
      btn.disabled = false;
    }
  });

  document.getElementById('logout-btn').addEventListener('click', async () => {
    const btn = document.getElementById('logout-btn');
    btn.disabled = true;
    try {
      await signOutCurrentUser();
      navigateTo('landing');
    } catch (err) {
      console.error('로그아웃 실패:', err);
      alert('로그아웃에 실패했습니다.');
    } finally {
      btn.disabled = false;
    }
  });

  document.getElementById('header-login-btn').addEventListener('click', () => {
    navigateTo('auth');
  });

  // 로그인 상태를 먼저 확인한 뒤에 라우팅해야 보호된 화면이 잠깐 보였다가 사라지는 깜빡임을 막을 수 있다
  const { data: sessionData } = await supabaseClient.auth.getSession();
  state.currentUser = sessionData.session ? sessionData.session.user : null;
  updateAuthHeader();

  supabaseClient.auth.onAuthStateChange((event, authSession) => {
    const wasLoggedOut = !state.currentUser;
    state.currentUser = authSession ? authSession.user : null;
    updateAuthHeader();
    // Google 로그인은 브라우저가 완전히 다른 페이지(Google)로 이동했다가 돌아오는 방식이라,
    // 콜백(?code=...) 처리 시점엔 이 스크립트가 처음부터 다시 실행된 상태다. 즉 state.currentView는
    // 항상 기본값(landing)이라 "로그인 화면에 있었는지"로는 판단할 수 없고, "로그아웃 상태였다가
    // 방금 로그인됐는지"로 판단해야 한다.
    if (event === 'SIGNED_IN' && wasLoggedOut) {
      navigateTo('dashboard');
    }
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
