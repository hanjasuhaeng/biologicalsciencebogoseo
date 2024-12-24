function solve(N, M, A, B, E) {
  const map = new Map();
  for (let i = 0; i < N; i++) if (A[i] === 1 && B[i] === 0) map.set(i, map.size);
  for (let i = 0; i < 1 << map.size; i++) {
    let isBreaked = false;
    for (const [father, mother, children] of E) {
      switch (B[father - 1] * 2 + B[mother - 1]) {
        case 0: // 부: XRY
          if ((i & 1 << map.get(mother - 1)) === 0) { // 모: XRXR
            for (const child of children) {
              if (A[child - 1] === 0 ? B[child - 1] === 0 : B[child - 1] === 0 && (i & 1 << map.get(child - 1)) === 0) continue;
              isBreaked = true;
              break;
            }
          } else { // 모: XRXr
            for (const child of children) {
              if (A[child - 1] === 0 ? true : B[child - 1] === 0) continue;
              isBreaked = true;
              break;
            }
          }
          break;
        case 1: // 부: XRY, 모: XrXr
          for (const child of children) {
            if (A[child - 1] === 0 ? B[child - 1] === 1 : B[child - 1] === 0 && (i & 1 << map.get(child - 1)) !== 0) continue;
            isBreaked = true;
            break;
          }
          break;
        case 2: // 부: XrY
          if ((i & 1 << map.get(mother - 1)) === 0) { // 모: XRXR
            for (const child of children) {
              if (A[child - 1] === 0 ? B[child - 1] === 0 : B[child - 1] === 0 && (i & 1 << map.get(child - 1)) !== 0) continue;
              isBreaked = true;
              break;
            }
          } else { // 모: XRXr
            for (const child of children) {
              if (A[child - 1] === 0 ? true : (B[child - 1] === 0 && (i & 1 << map.get(child - 1)) !== 0) || B[child - 1] === 1) continue;
              isBreaked = true;
              break;
            }
          }
          break;
        case 3: // 부: XrY, 모: XrXr
          for (const child of children) {
            if (A[child - 1] === 0 ? B[child - 1] === 1 : B[child - 1] === 1) continue;
            isBreaked = true;
            break;
          }
          break;
      }

      if (isBreaked) break;
    }

    if (!isBreaked) {
      const result = [];
      for (let j = 0; j < N; j++) {
        switch (A[j] * 2 + B[j]) {
          case 0:
            result.push(`${j + 1}의 유전자형: XRY`);
            break;
          case 1:
            result.push(`${j + 1}의 유전자형: XrY`);
            break;
          case 2:
            result.push(`${j + 1}의 유전자형: ${(i & 1 << map.get(j)) === 0 ? 'XRXR' : 'XRXr'}`);
            break;
          case 3:
            result.push(`${j + 1}의 유전자형: XrXr`);
            break;
        }
      }

      return result.join('\n');
    }
  }

  return -1;
}

// 이 함수는 사용자가 입력을 하면 solve 함수를 호출합니다.
function run() {
  const N = prompt('사람 수');
  const M = prompt('가족 수');
  const A = eval(prompt('성별 (남 0, 여 1) [0, 1, ... ]'));
  const B = eval(prompt('적록색맹 (미발현 0, 발현 1) [0, 1, ... ]'));
  const E = eval(prompt('가족 [[부, 모, 자식 배열], ...]'));

  console.log(solve(N, M, A, B, E));
}