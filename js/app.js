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

async function createSession() {
  const now = new Date().toISOString();
  const session = {
    id: generateId(),
    customerAlias: '',
    productTypeId: null,
    checklist: {},
    notes: '',
    createdAt: now,
    updatedAt: now
  };
  await upsertSession(session);
  return session;
}

// ===================================================================
// 5. 화면 전환
// ===================================================================
const state = {
  currentView: 'landing',
  activeSessionId: null,
  dashboardSearch: ''
};

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
function renderScriptPanel(productTypeId, targetEl) {
  const script = SCRIPTS[productTypeId];
  if (!script) {
    targetEl.innerHTML = '<p class="empty">상품유형을 선택하면 고지 스크립트가 표시됩니다.</p>';
    return;
  }
  const paragraphs = script.body.map((p) => `<p>${escapeHtml(p)}</p>`).join('');
  targetEl.innerHTML = `<h4>${escapeHtml(script.title)}</h4>${paragraphs}`;
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

  if (sessions.length === 0) {
    container.innerHTML = term
      ? '<p class="empty">검색 결과가 없습니다.</p>'
      : '<p class="empty">저장된 상담이 없습니다.</p>';
    return;
  }

  container.innerHTML = sessions.map((s) => {
    const alias = s.customerAlias || '(고객명 미입력)';
    return `<div class="session-row" data-id="${escapeHtml(s.id)}">
      <span class="session-date">${formatDateTime(s.updatedAt)}</span>
      <span class="session-alias">${escapeHtml(alias)}</span>
      <span class="badge">${escapeHtml(getProductLabel(s.productTypeId))}</span>
    </div>`;
  }).join('');

  container.querySelectorAll('.session-row').forEach((row) => {
    row.addEventListener('click', () => {
      navigateTo('consultation', row.dataset.id);
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
    });
  });
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
}

document.addEventListener('DOMContentLoaded', init);
