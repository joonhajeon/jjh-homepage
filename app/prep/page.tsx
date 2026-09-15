import CopyButton from '@/components/CopyButton'

export default function PrepPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
      <p className="text-xs font-bold text-emerald-600 tracking-widest uppercase mb-4">Prep</p>
      <h1 className="text-4xl font-black text-stone-900 mb-3 tracking-tight break-keep">
        수업 전, 이 5가지만 설치해주세요
      </h1>
      <p className="text-stone-500 mb-14 font-medium break-keep">
        당일 실습 시간을 확보하기 위한 최소 준비물입니다. 순서대로 하시면 20분이면 충분합니다.
      </p>

      <div className="flex flex-col gap-6">
        {/* 1. Claude 데스크톱 앱 */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">01</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">Claude 데스크톱 앱</h2>
          </div>
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
              오늘 실습까지 직접 따라오시려면 <b className="font-black">Claude Pro 또는 Max 유료 플랜(월 $20~)</b>이 필요합니다.
            </p>
            <p className="m-0">다만 아래 두 경우엔 결제 없이 참석하셔도 됩니다.</p>
            <ul className="flex flex-col gap-1.5 pl-4 list-disc">
              <li>
                <b className="font-black">챗GPT Plus나 제미나이 유료 플랜을 이미 쓰고 계신 분</b> — 클로드 대신 <b className="font-black">Codex</b>(챗GPT) 또는 <b className="font-black">Antigravity</b>(제미나이)를 설치하시면 비슷한 효과를 볼 수 있습니다. 다만 화면·명령어가 클로드와 달라서, 오늘 자료의 화면과 100% 똑같지는 않을 수 있고 설치 중 문제가 생겨도 그 자리에서 바로 도와드리긴 어렵습니다.
              </li>
              <li>
                <b className="font-black">오늘은 개념만 구경하고 싶으신 분</b> — 결제 없이 오셔도 되고, 시연 위주로 따라오시면 됩니다.
              </li>
            </ul>
          </div>
        </div>

        {/* 2. Node.js */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">02</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">Node.js</h2>
          </div>
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

        {/* 3. VS Code */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">03</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">VS Code</h2>
          </div>
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

        {/* 4. Claude Code CLI */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">04</span>
            <h2 className="text-lg font-black text-stone-900 tracking-tight">Claude Code CLI</h2>
          </div>
          <p className="text-sm text-stone-500 font-medium leading-relaxed mb-5 break-keep">
            이 단계가 가장 많이 막히는 부분입니다. 앞의 VS Code는 클릭 몇 번이면 끝나지만, 이건 터미널(명령어 창)에서
            직접 설치해야 해서 컴퓨터 환경에 따라 다른 오류가 날 수 있습니다 — 100% 한 번에 끝난다고 장담은 못 드립니다.
          </p>

          <p className="text-xs font-black text-stone-400 tracking-widest uppercase mb-3">0단계 · Cowork를 설치 도우미로 켜두기</p>
          <ul className="flex flex-col gap-2 text-sm text-stone-600 font-medium mb-4">
            <li className="flex gap-2">
              <span className="text-stone-300 flex-shrink-0">—</span>Claude 데스크톱 앱 실행 → <b className="font-black text-stone-800">Cowork</b> 탭 → 새 대화 시작
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
            <span className="text-stone-300 flex-shrink-0">—</span>화면에 <b className="font-black text-stone-800">&ldquo;Claude Code successfully installed!&rdquo;</b> 같은 설치 성공 메시지가 뜨면 끝입니다. 바로 이어서 버전을 확인하거나 로그인해보지 않으셔도 됩니다 — 설치 직후엔 확인이 안 되는 것처럼 보일 때가 있는데, 그래도 실제로는 정상적으로 설치된 경우가 대부분입니다.
          </p>

          <p className="text-xs font-black text-stone-400 tracking-widest uppercase mb-3">에러가 나면</p>
          <p className="text-sm text-stone-600 font-medium mb-3 flex gap-2">
            <span className="text-stone-300 flex-shrink-0">—</span>성공 메시지 대신 에러 메시지가 뜨면, 화면을 캡처해서 같은 Cowork 창에 붙여넣고 &ldquo;이런 에러가 났어&rdquo;라고 물어보세요.
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

        {/* 5. Typeless */}
        <div className="bg-white border border-stone-100 rounded-xl p-7">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-xs font-black text-stone-300 tabular-nums">05</span>
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
          </ul>
        </div>
      </div>

      {/* 체크리스트 */}
      <div className="mt-10 bg-white border border-stone-100 rounded-xl p-7">
        <h3 className="text-base font-black text-stone-900 mb-4 tracking-tight">체크리스트</h3>
        <ul className="flex flex-col">
          {[
            'Claude 데스크톱 앱 설치 + 로그인 + 유료 플랜(Pro/Max) 결제 확인',
            'Node.js 설치',
            'VS Code 설치',
            'Claude Code CLI 설치(Cowork와 함께) — 성공 메시지 확인이면 충분',
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
