import CopyButton from '@/components/CopyButton'

function Why({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-stone-500 font-medium leading-relaxed mb-4 break-keep">
      <span className="font-black text-emerald-600 mr-1.5">왜 설치하나요?</span>
      {children}
    </p>
  )
}

export default function PrepPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
      <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-4">Prep</p>
      <h1 className="text-4xl font-black text-stone-900 mb-3 tracking-tight break-keep">
        수업 전, 이 7가지만 설치해주세요
      </h1>
      <p className="text-stone-500 font-medium break-keep">
        수업의 원활한 진행을 위해 아래 프로그램들을 미리 설치해 오시면 좋습니다. 순서대로 하시면 10분이면 충분합니다.
      </p>
      <p className="text-stone-500 mb-14 font-medium break-keep">
        설치 중 막히시면 언제든 본인이 자주 사용하는 AI에게 물어보세요. 그래도 어렵다면 수업에 그냥 참석하셔도 됩니다.
      </p>

      <div className="flex flex-col gap-6">
        {/* 1. Claude 데스크톱 앱 */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">01</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">Claude 데스크톱 앱</h2>
          </div>
          <Why>AI와 대화하며 일을 시키는 기본 프로그램입니다. 오늘 수업의 모든 실습이 이 앱에서 시작됩니다.</Why>
          <ul className="flex flex-col gap-2 text-sm text-stone-600 font-medium">
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>
              <span>
                <a href="https://claude.com/ko/download" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline underline-offset-2 hover:opacity-80">
                  claude.com/ko/download
                </a>
                에서 다운로드 및 설치
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>설치 후 구글 계정으로 로그인
            </li>
          </ul>
          <div className="mt-4 flex flex-col gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 font-medium">
            <p className="m-0">
              <span className="mr-1.5">⚠️</span>
              오늘 실습까지 직접 따라오시려면 <b className="font-black">Claude Pro 또는 Max 유료 플랜(월 $20~)</b>이 필요합니다. 시작은 Pro 결제로 하시면 됩니다.
            </p>
            <p className="m-0">
              오늘은 유료 결제 없이 개념만 구경하고 싶으신 분 — 아래 <b className="font-black">02번 챗지피티(ChatGPT) 데스크톱 앱</b>을 설치해서 오세요.
            </p>
          </div>
        </div>

        {/* 2. ChatGPT 데스크톱 앱 (해당자만) */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex flex-wrap items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">02</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">ChatGPT 데스크톱 앱</h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700">해당하는 분만</span>
          </div>
          <Why>클로드 대신 쓸 수 있는 AI 앱입니다. 클로드를 쓰지 않으셔도 이 앱으로 수업 내용을 비슷하게 체험해보실 수 있습니다.</Why>
          <p className="text-sm text-stone-500 font-medium leading-relaxed mb-3 break-keep">
            Claude 유료 플랜은 쓰지 않고 <b className="font-black text-stone-800">ChatGPT 유료 플랜만</b> 쓰시는 분, 또는 <b className="font-black text-stone-800">유료 결제 없이 개념만 구경하실 분</b>은 설치해주세요.
          </p>
          <ul className="flex flex-col gap-2 text-sm text-stone-600 font-medium">
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>
              <span>
                <a href="https://chatgpt.com/ko-KR/download/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline underline-offset-2 hover:opacity-80">
                  chatgpt.com/ko-KR/download
                </a>
                에서 다운로드 및 설치
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>설치 후 챗GPT 계정으로 로그인
            </li>
          </ul>
        </div>

        {/* 3. Node.js */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">03</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">Node.js</h2>
          </div>
          <Why>AI가 만들어준 프로그램을 내 컴퓨터에서 돌릴 수 있게 해주는 엔진 같은 프로그램입니다. 직접 다룰 일은 없고, 설치만 해두면 뒤에서 알아서 일합니다.</Why>
          <ul className="flex flex-col gap-2 text-sm text-stone-600 font-medium">
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>
              <span>
                <a href="https://nodejs.org/ko/download" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline underline-offset-2 hover:opacity-80">
                  nodejs.org/ko/download
                </a>
                에서 다운로드 및 설치
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>다운로드된 설치파일 실행 → 기본값 그대로 &ldquo;Next&rdquo;만 눌러서 설치
            </li>
          </ul>
        </div>

        {/* 4. VS Code */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">04</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">VS Code</h2>
          </div>
          <Why>AI가 만든 파일과 폴더를 한눈에 보여주는 작업 책상 같은 프로그램입니다. 내 컴퓨터 안에서 AI가 일하는 모습을 눈으로 확인할 수 있습니다.</Why>
          <ul className="flex flex-col gap-2 text-sm text-stone-600 font-medium">
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>
              <span>
                <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline underline-offset-2 hover:opacity-80">
                  code.visualstudio.com
                </a>
                에서 본인 OS(Windows/Mac)에 맞는 버전으로 다운로드 및 설치
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>설치만 해두시면 됩니다. 사용법은 당일 안내해드립니다.
            </li>
          </ul>
        </div>

        {/* 5. Claude Code CLI */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">05</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">Claude Code CLI</h2>
          </div>
          <Why>AI가 내 컴퓨터의 폴더와 파일에 직접 들어가 일할 수 있게 해주는 도구입니다. 대화창에서 복사·붙여넣기만 하던 방식에서 벗어나, AI가 파일을 직접 만들고 고쳐줍니다.</Why>
          <p className="text-sm text-stone-500 font-medium leading-relaxed mb-3 break-keep">
            Claude Code CLI는 앞의 프로그램들과 달리 <b className="font-black text-stone-800">터미널(명령어 창)에서 직접 설치</b>해야 합니다. <b className="font-black text-stone-800">Claude 데스크톱 앱을 설치 도우미</b>로 함께 켜놓고 시작해주세요.
          </p>
          <p className="text-xs font-black text-stone-400 tracking-widest uppercase mb-2">터미널 여는 방법</p>
          <ul className="flex flex-col gap-1.5 text-sm text-stone-600 font-medium mb-5">
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>Windows: 화면 하단 <b className="font-black text-stone-800">검색</b> 아이콘 클릭 → <b className="font-black text-stone-800">&ldquo;Windows PowerShell&rdquo;</b> 입력 → 뜨는 앱 클릭
            </li>
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>Mac: <b className="font-black text-stone-800">Spotlight 검색</b>(Cmd + Space) → <b className="font-black text-stone-800">&ldquo;터미널&rdquo;</b> 입력 → 뜨는 앱 클릭
            </li>
          </ul>

          <p className="text-xs font-black text-stone-400 tracking-widest uppercase mb-3">0단계 · Claude를 설치 도우미로 켜두기</p>
          <ul className="flex flex-col gap-2 text-sm text-stone-600 font-medium mb-4">
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>Claude 데스크톱 앱 실행 → <b className="font-black text-stone-800">새 대화 시작</b>
            </li>
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>아래 문장을 그대로 붙여넣고 [Windows/Mac]만 본인 컴퓨터에 맞게 바꿔서 전송
            </li>
          </ul>
          <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg p-4 text-[13.5px] text-emerald-800 font-semibold leading-relaxed mb-4">
            &ldquo;나는 [Windows/Mac] 컴퓨터를 쓰고 있어. Claude Code CLI를 설치하려고 하는데, 내 터미널에 직접 입력할
            명령어를 순서대로 알려줘. 설치 중간에 에러가 나면 스크린샷을 여기 보여줄 테니, 그걸 보고 다음 단계를
            알려줘.&rdquo;
          </div>
          <p className="text-sm text-stone-600 font-medium mb-6 flex gap-2">
            <span className="text-stone-300 flex-shrink-0">—</span>이 대화창은 설치가 끝날 때까지 닫지 마세요. 오류가 나면 여기로 돌아옵니다.
          </p>

          <p className="text-xs font-black text-stone-400 tracking-widest uppercase mb-3">1단계 · 명령어 실행</p>
          <div className="flex flex-col gap-3 mb-6">
            <div className="relative">
              <span className="absolute -top-2.5 left-3.5 bg-stone-700 text-stone-200 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded">
                Windows · PowerShell
              </span>
              <CopyButton text="irm https://claude.ai/install.ps1 | iex" />
              <pre className="bg-stone-900 text-stone-100 rounded-lg px-4 pt-5 pb-3.5 text-[13.5px] font-mono overflow-x-auto">
                irm https://claude.ai/install.ps1 | iex
              </pre>
            </div>
            <div className="relative">
              <span className="absolute -top-2.5 left-3.5 bg-stone-700 text-stone-200 text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded">
                Mac · 터미널
              </span>
              <CopyButton text="curl -fsSL https://claude.ai/install.sh | bash" />
              <pre className="bg-stone-900 text-stone-100 rounded-lg px-4 pt-5 pb-3.5 text-[13.5px] font-mono overflow-x-auto">
                curl -fsSL https://claude.ai/install.sh | bash
              </pre>
            </div>
          </div>

          <p className="text-sm text-stone-600 font-medium mb-4 flex gap-2">
            <span className="text-stone-300 flex-shrink-0">—</span>화면에 <b className="font-black text-stone-800">&ldquo;Claude Code successfully installed!&rdquo;</b> 같은 설치 성공 메시지가 뜨면 끝입니다.
          </p>

          <p className="text-xs font-black text-stone-400 tracking-widest uppercase mb-3">에러가 나면</p>
          <p className="text-sm text-stone-600 font-medium mb-3 flex gap-2">
            <span className="text-stone-300 flex-shrink-0">—</span>성공 메시지 대신 에러 메시지가 뜨면, 화면을 캡처해서 같은 대화창에 붙여넣고 &ldquo;이런 에러가 났어&rdquo;라고 물어보세요.
          </p>
          <div className="flex gap-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800 font-medium mb-4">
            <span>🔁</span>
            <span>한 번에 끝날 수도, 몇 번 재시도할 수도 있습니다. <b className="font-black">둘 다 정상</b>입니다 — 반복하면 결국 설치됩니다.</span>
          </div>
          <p className="text-sm text-stone-600 font-medium flex gap-2">
            <span className="text-stone-300 flex-shrink-0">—</span>
            공식 설치 문서:{' '}
            <a href="https://code.claude.com/docs/en/setup" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline underline-offset-2 hover:opacity-80">
              code.claude.com/docs/en/setup
            </a>
          </p>
        </div>

        {/* 6. Git */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">06</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">Git</h2>
          </div>
          <Why>작업한 내용을 저장해두고 언제든 이전 상태로 되돌릴 수 있게 해주는 저장 기록 장치입니다. AI가 파일을 잘못 고쳐도 원래대로 돌릴 수 있어서 안심하고 맡길 수 있습니다.</Why>
          <ul className="flex flex-col gap-2 text-sm text-stone-600 font-medium">
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>
              <span>
                <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline underline-offset-2 hover:opacity-80">
                  git-scm.com
                </a>
                에서 본인 OS(Windows/Mac)에 맞는 버전으로 다운로드 및 설치
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>설치만 해두시면 됩니다. 사용법은 당일 안내해드립니다.
            </li>
          </ul>
        </div>

        {/* 7. Typeless */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">07</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">Typeless</h2>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-stone-600 font-medium">
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>
              <span>
                <a href="https://www.typeless.com/refer?code=GHCO6NE" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline underline-offset-2 hover:opacity-80">
                  typeless.com
                </a>
                에서 다운로드 및 설치
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>말로 이야기하면 글로 바꿔주는 음성 입력 도구입니다. 당일 프롬프트를 직접 입력할 때 활용해보세요.
            </li>
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>이 프로그램은 설치하고 바로 사용해보시길 추천드립니다.
            </li>
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>자신의 컴퓨터에 <b className="font-black text-stone-800">내장 마이크</b>가 있어야 작동 가능합니다.
            </li>
          </ul>
        </div>
      </div>

      {/* 체크리스트 */}
      <div className="mt-10 bg-white border border-stone-100 rounded-xl p-7">
        <h3 className="text-base font-black text-stone-900 mb-4 tracking-tight">체크리스트</h3>
        <ul className="flex flex-col">
          {[
            'Claude 데스크톱 앱 설치 + 로그인 + 유료 플랜(Pro/Max) 결제 확인',
            'ChatGPT 데스크톱 앱 설치 (ChatGPT 유료만 쓰시는 분, 또는 개념만 구경하실 분)',
            'Node.js 설치',
            'VS Code 설치',
            'Claude Code CLI 설치 — 성공 메시지 확인이면 충분',
            'Git 설치',
            'Typeless 설치',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 py-2 text-sm text-stone-700 font-medium border-b border-stone-100 last:border-b-0">
              <span className="w-4 h-4 mt-0.5 border-[1.5px] border-stone-300 rounded flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
