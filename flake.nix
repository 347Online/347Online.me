{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/25.11";
    flake-parts.url = "github:hercules-ci/flake-parts";

    enough-css = {
      url = "github:jeffkreeftmeijer/enough.css";
      flake = false;
    };
  };

  outputs =
    inputs@{
      flake-parts,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [ ./scripts.nix ];

      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
        "x86_64-darwin"
      ];

      perSystem =
        {
          pkgs,
          config,
          lib,
          ...
        }:
        {
          devShells.default = pkgs.mkShell {
            buildInputs =
              with pkgs;
              [
                yarn
                pandoc
              ]
              ++ builtins.map (x: x.value) (lib.attrsToList config.packages);
          };
        };
    };
}
