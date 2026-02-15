function createHeap<T extends (a: any, b: any) => boolean>(
  cmp: T,
  k: number = Infinity,
) {
  const heap: Parameters<T>[] = [];
  const bubble_up = (arr: Parameters<T>[], i: number) => {
    // Bubble up will ensure that every new item pushed to the array will satisfy the heap property
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (cmp(arr[parent], arr[i])) break;
      [arr[parent], arr[i]] = [arr[i], arr[parent]];
      i = parent;
    }
  };
  const bubble_down = (arr: Parameters<T>[], i: number) => {
    // Bubble down will ensure that when we pop an item from our array, the heap will restructure itself
    // to satisfy its properties
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;
      if (left < arr.length && cmp(arr[left], arr[smallest])) smallest = left;
      if (right < arr.length && cmp(arr[right], arr[smallest]))
        smallest = right;
      if (smallest === i) break;
      [arr[smallest], arr[i]] = [arr[i], arr[smallest]];
      i = smallest;
    }
  };
  return new Proxy(heap, {
    get(target: Parameters<T>[], prop: string) {
      if (prop === "push") {
        return (val: Parameters<T>) => {
          if (target.length < k) {
            target.push(val);
            bubble_up(target, target.length - 1);
          } else {
            if (cmp(target[0], val)) {
              target[0] = val;
              bubble_down(target, 0);
            }
          }
        };
      }
      if (prop === "pop") {
        // Modifying the pop to return the first element and then swap the last with first and bubbling down
        return () => {
          if (target.length === 0) return undefined;
          if (target.length === 1) return target.pop();
          const val = target[0];
          target[0] = target.pop()!;
          bubble_down(target, 0);
          return val;
        };
      }
      if (prop === "peek") {
        return () => target[0];
      }
      if (prop === "size") return target.length;
    },
    set(target, prop, value) {
      // we prevent regular assignment to the array
      if (typeof prop === "string" && !isNaN(Number(prop))) {
        throw new Error("Direct assignment not allowed; use push()");
      }
      return Reflect.set(target, prop, value);
    },
  });
}
