export const evaluateExpression = (expr, data) => {
  if (!expr) return '';
  return expr.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
    const keys = path.trim().split('.');
    let value = data;
    for (const key of keys) { value = value?.[key]; if (value === undefined) return ''; }
    return value;
  });
};