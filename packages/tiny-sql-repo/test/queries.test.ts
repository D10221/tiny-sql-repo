import queries from "../src/queries";
type TestTable = {
  id: number;
  value: string;
};
function clean(x: string) {
  return x.trim().replace(/(\s|\r|\n|\t)+/g, " ");
}
describe("sql-queries", () => {
  const {
    insert,
    count,
    exists,
    set,
    update,
    find,
    get,
    paged,
    remove,
  } = queries<TestTable, "id">({
    pkey: "id",
    tableName: "testtable",
    pkeyAuto: true,
  });
  const txt = insert({ id: 0, value: "x" });
  it("insert pkeyAuto", () => {
    expect(clean(txt)).toBe(
      "INSERT INTO [testtable] ([value]) VALUES (@value); SELECT @@IDENTITY as [id]",
    );
  });
  it("inserts no auto", () => {
    const q = queries<TestTable, "id">({
      pkey: "id",
      tableName: "testtable",
    });
    const txt = q.insert({ id: 1, value: "1" });
    expect(clean(txt)).toBe(
      "INSERT INTO [testtable] ([id], [value]) VALUES (@id, @value); SELECT 1 as [id]",
    );
  });
  it("counts", () => {
    expect(clean(count())).toBe("SELECT count([id]) FROM [testtable]");
  });
  it("counts filter", () => {
    expect(clean(count("1=1"))).toBe(
      "SELECT count([id]) FROM [testtable] WHERE 1=1",
    );
  });
  it("exists", () => {
    expect(exists()).toBe(
      "SELECT CASE WHEN exists( SELECT [id] FROM [testtable]  ) THEN 1 ELSE 0 END",
    );
  });
  it("exists where", () => {
    expect(exists("1=1")).toBe(
      "SELECT CASE WHEN exists( SELECT [id] FROM [testtable] WHERE 1=1 ) THEN 1 ELSE 0 END",
    );
  });
  it("delete", () => {
    const q = queries<TestTable, "id">({
      pkey: "id",
      tableName: "testtable",
    });
    const text = q.remove();
    expect(text).toBe("DELETE [testtable] WHERE [id] = @id");
  });
  it("delete filter", () => {
    const q = queries<TestTable, "id">({
      pkey: "id",
      tableName: "testtable",
    });
    const text = q.remove("1=1");
    expect(text).toBe("DELETE [testtable] WHERE 1=1");
  });
  it("Sets auto", () => {
    const data = { id: 0, value: "0" };
    const txt = set(data);
    expect(clean(txt)).toBe(
      "IF(EXISTS(SELECT [id] FROM [testtable] WHERE [id]=@id)) " +
        "UPDATE [testtable] SET [value]=@value " +
        "WHERE [id] = @id " +
        "ELSE INSERT INTO [testtable] ([value]) VALUES (@value);" +
        "SELECT @@IDENTITY as [id]",
    );
  });
  it("TODO: find", () => {
    expect(find).toBeInstanceOf(Function);
  });
  it("TODO get", () => {
    expect(get).toBeInstanceOf(Function);
  });
  it("TODO paged", () => {
    expect(paged).toBeInstanceOf(Function);
  });
  it("TODO remove", () => {
    expect(remove).toBeInstanceOf(Function);
  });
  it("TODO update", () => {
    expect(update).toBeInstanceOf(Function);
  });
});
