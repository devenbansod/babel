"use strict";

const normalizeOptions = require("../lib/normalize-options.js");

const {
  checkDuplicateIncludeExcludes,
  normalizePluginNames,
  validateBoolOption,
  validateIncludesAndExcludes,
  validateModulesOption,
} = normalizeOptions;

describe("normalize-options", () => {
  describe("normalizeOptions", () => {
    it("should return normalized `include` and `exclude`", () => {
      const normalized = normalizeOptions.default({
        include: ["babel-plugin-transform-spread", "transform-classes"],
      });
      expect(normalized.include).toEqual([
        "transform-spread",
        "transform-classes",
      ]);
    });

    it("should throw if duplicate names in `include` and `exclude`", () => {
      const normalizeWithSameIncludes = () => {
        normalizeOptions.default({
          include: ["babel-plugin-transform-spread"],
          exclude: ["transform-spread"],
        });
      };
      expect(normalizeWithSameIncludes).toThrow();
    });
  });

  describe("validateBoolOption", () => {
    it("`undefined` option returns false", () => {
      expect(validateBoolOption("test", undefined, false)).toBe(false);
    });

    it("`false` option returns false", () => {
      expect(validateBoolOption("test", false, false)).toBe(false);
    });

    it("`true` option returns true", () => {
      expect(validateBoolOption("test", true, false)).toBe(true);
    });

    it("array option is invalid", () => {
      expect(() => {
        validateBoolOption("test", [], false);
      }).toThrow();
    });
  });

  describe("checkDuplicateIncludeExcludes", function() {
    it("should throw if duplicate names in both", function() {
      expect(() => {
        checkDuplicateIncludeExcludes(
          ["transform-regenerator", "map"],
          ["transform-regenerator", "map"],
        );
      }).toThrow();
    });

    it("should not throw if no duplicate names in both", function() {
      expect(() => {
        checkDuplicateIncludeExcludes(["transform-regenerator"], ["map"]);
      }).not.toThrow();
    });
  });

  describe("normalizePluginNames", function() {
    it("should drop `babel-plugin-` prefix if needed", function() {
      expect(
        normalizePluginNames([
          "babel-plugin-transform-object-super",
          "transform-parameters",
        ]),
      ).toEqual(["transform-object-super", "transform-parameters"]);
    });

    it("should not throw if no duplicate names in both", function() {
      expect(() => {
        checkDuplicateIncludeExcludes(["transform-regenerator"], ["map"]);
      }).not.toThrow();
    });
  });

  describe("validateModulesOption", () => {
    it("`undefined` option returns commonjs", () => {
      expect(validateModulesOption()).toBe("commonjs");
    });

    it("`false` option returns commonjs", () => {
      expect(validateModulesOption(false)).toBe(false);
    });

    it("commonjs option is valid", () => {
      expect(validateModulesOption()).toBe("commonjs");
    });

    it("systemjs option is valid", () => {
      expect(validateModulesOption("systemjs")).toBe("systemjs");
    });

    it("amd option is valid", () => {
      expect(validateModulesOption("amd")).toBe("amd");
    });

    it("umd option is valid", () => {
      expect(validateModulesOption("umd")).toBe("umd");
    });

    it("`true` option is invalid", () => {
      expect(() => {
        validateModulesOption(true);
      }).toThrow();
    });

    it("array option is invalid", () => {
      expect(() => {
        validateModulesOption([]);
      }).toThrow();
    });
  });
  describe("validateIncludesAndExcludes", function() {
    it("should return empty arrays if undefined", function() {
      expect(validateIncludesAndExcludes()).toEqual([]);
    });
    it("should throw if not in features", function() {
      expect(() => {
        validateIncludesAndExcludes(["asdf"]);
      }).toThrow();
    });
  });
});
