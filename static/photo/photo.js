for await (const d of Deno.readDir("./data")) {
    console.log(d.name);
  }