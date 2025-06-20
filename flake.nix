{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      utils,
      ...
    }:
    utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnsupportedSystem = true;
        };
        scripts = {
          build-resume = pkgs.writeShellApplication {
            name = "build-resume";
            runtimeInputs = with pkgs; [
              nodePackages.prettier
              wkhtmltopdf
            ];
            text = ''
              shopt -s globstar

              if [[ ! -d "public" ]]; then
                mkdir "public"
              fi

              for x in resume/*.md; do
                fname="$(basename "$x")"
                template_path="resume/''${fname%.*}.template.html"
                css_path="resume/''${fname%.*}.css"

                cp resume/*.css public/

                # Plaintext
                pandoc "$x" -t plain -o "public/''${fname%.*}.txt"

                template () {
                  if [[ -f $template_path ]]; then
                    echo "--template" "$template_path"
                  else
                    echo "--template" "resume/template.html"
                  fi
                }

                css () {
                  if [[ -f $css_path ]]; then
                    echo " --css" "$css_path"
                  fi
                }

                # HTML
                eval "pandoc $x -t html $(template)" | prettier --stdin-filepath foo.html > "public/''${fname%.*}.html"

                # PDF
                eval "pandoc $x -t html $(template)$(css) -o public/''${fname%.*}.pdf"
              done
            '';
          };
        };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs =
            with pkgs;
            [
              yarn
              pandoc
            ]
            ++ builtins.map (x: x.value) (lib.attrsToList scripts);
        };
        packages = scripts;
      }
    );
}
