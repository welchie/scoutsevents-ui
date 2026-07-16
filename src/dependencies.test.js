describe('Security Dependency Auditing', () => {
  test('transitive dependencies resolve to safe versions', () => {
    // 1. uuid should be >= 11.1.1 (fixes buffer bounds check vulnerability)
    const uuidVersion = require('uuid/package.json').version;
    const [uuidMajor, uuidMinor, uuidPatch] = uuidVersion.split('.').map(Number);
    expect(uuidMajor).toBeGreaterThanOrEqual(11);
    if (uuidMajor === 11) {
      expect(uuidMinor).toBeGreaterThanOrEqual(1);
      if (uuidMinor === 1) {
        expect(uuidPatch).toBeGreaterThanOrEqual(1);
      }
    }

    // 2. postcss should be >= 8.5.10 (fixes line return parsing / CSS XSS vulnerability)
    const postcssVersion = require('postcss/package.json').version;
    const [postcssMajor, postcssMinor, postcssPatch] = postcssVersion.split('.').map(Number);
    expect(postcssMajor).toBeGreaterThanOrEqual(8);
    if (postcssMajor === 8) {
      expect(postcssMinor).toBeGreaterThanOrEqual(5);
      if (postcssMinor === 5) {
        expect(postcssPatch).toBeGreaterThanOrEqual(10);
      }
    }

    // 3. serialize-javascript should be >= 7.0.7 (fixes RCE vulnerability)
    const serializeVersion = require('serialize-javascript/package.json').version;
    const [serializeMajor, serializeMinor, serializePatch] = serializeVersion.split('.').map(Number);
    expect(serializeMajor).toBeGreaterThanOrEqual(7);
    if (serializeMajor === 7) {
      expect(serializeMinor).toBeGreaterThanOrEqual(0);
      if (serializeMinor === 0) {
        expect(serializePatch).toBeGreaterThanOrEqual(7);
      }
    }

    // 4. underscore should be >= 1.13.8 (fixes DoS vulnerability)
    const underscoreVersion = require('underscore/package.json').version;
    const [underscoreMajor, underscoreMinor, underscorePatch] = underscoreVersion.split('.').map(Number);
    expect(underscoreMajor).toBeGreaterThanOrEqual(1);
    if (underscoreMajor === 1) {
      expect(underscoreMinor).toBeGreaterThanOrEqual(13);
      if (underscoreMinor === 13) {
        expect(underscorePatch).toBeGreaterThanOrEqual(8);
      }
    }

    // 5. @tootallnate/once should be >= 2.0.1 (fixes control flow scoping vulnerability)
    const onceVersion = require('@tootallnate/once/package.json').version;
    const [onceMajor, onceMinor, oncePatch] = onceVersion.split('.').map(Number);
    expect(onceMajor).toBeGreaterThanOrEqual(2);
    if (onceMajor === 2) {
      expect(onceMinor).toBeGreaterThanOrEqual(0);
      if (onceMinor === 0) {
        expect(oncePatch).toBeGreaterThanOrEqual(1);
      }
    }

    // 6. nth-check should be >= 2.0.1 (fixes ReDoS vulnerability)
    const nthCheckVersion = require('nth-check/package.json').version;
    const [nthCheckMajor, nthCheckMinor, nthCheckPatch] = nthCheckVersion.split('.').map(Number);
    expect(nthCheckMajor).toBeGreaterThanOrEqual(2);
    if (nthCheckMajor === 2) {
      expect(nthCheckMinor).toBeGreaterThanOrEqual(0);
      if (nthCheckMinor === 0) {
        expect(nthCheckPatch).toBeGreaterThanOrEqual(1);
      }
    }
  });
});

