export function doBlocks(input: string): string {
  const lines = input.trim().split('\n');
  const n = parseInt(lines[0], 10);
  const commands = lines.slice(1);

  const state = Array.from({ length: n }, (_, i) => [i]);
  console.log(state);

  for (const command of commands) {
    if (command === 'quit') {
      break;
    }
    const values = command.split(' ');
    if (values.length !== 4) {
      throw new Error('Command is invalid: ' + command); // Invalid command format
    }
    const [action, idx, preposition, target] = values;
    const a = parseInt(idx, 10);
    const b = parseInt(target, 10);

    if (isNaN(a) || isNaN(b) || a < 0 || a >= n || b < 0 || b >= n) {
      throw new Error('Block number out of range: ' + command); // Block number out of range
    }

    switch (action) {
      case 'move':
        switch (preposition) {
          case 'onto': {
            // Move a onto b, clean up any other blocks
            const toReturn = state[a]
              .filter((x) => x !== a)
              .concat(state[b].filter((x) => x !== b));
            state[b] = [b, a];
            state[a] = [];
            for (const block of toReturn) {
              state[block] = [block];
            }
            // Implement move logic here
            break;
          }
          case 'over': {
            // Move a over b, clean up any other blocks on top of a
            const toReturn = state[a].filter((x) => x !== a);
            state[b] = [...state[b], a];
            state[a] = [];
            for (const block of toReturn) {
              state[block] = [block];
            }
            break;
          }
        }
        break;
      case 'pile':
        switch (preposition) {
          case 'onto': {
            // pile a onto b, clean up any other blocks
            const toReturn = state[b].filter((x) => x !== b);
            state[b] = [b, ...state[a]];
            state[a] = [];
            for (const block of toReturn) {
              state[block] = [block];
            }
            // Implement move logic here
            break;
          }
          case 'over': {
            // Move a over b, clean up any other blocks on top of a
            state[b] = [...state[b], ...state[a]];
            state[a] = [];
            break;
          }
        }
        break;
      default:
        throw new Error('Unknown action: ' + command); // Unknown action
    }
  }

  return state.map((x, i) => `${i}: ${x.join(' ')}`).join('\n');
}
