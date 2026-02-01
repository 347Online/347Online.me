{ inputs, ... }:
{
  perSystem =
    { pkgs, ... }:
    {
      packages = {
        update-css =
          let
            fname = "./src/_includes/css/enough.css";
          in
          pkgs.writeShellScriptBin "update-css" ''
            echo '/* Credit: enough.css - https://jeffkreeftmeijer.github.io/enough.css */' > ${fname}
            echo >> ${fname}
            cat ${inputs.enough-css}/enough.css >> ${fname}
          '';

        build-resume = pkgs.writeShellApplication {
          name = "build-resume";
          runtimeInputs = with pkgs; [
            nodePackages.prettier
            python3Packages.weasyprint
          ];
          text = ''
            shopt -s globstar

            outdir="_site"

            for x in resume/*.md; do
              fname="$(basename "$x")"
              template_path="resume/''${fname%.*}.template.html"
              css_path="resume/''${fname%.*}.css"

              cp resume/*.css "$outdir/"

              # Plaintext
              pandoc "$x" -t plain -o "$outdir/''${fname%.*}.txt"

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
              eval "pandoc $x -t html $(template)" | prettier --stdin-filepath foo.html > "$outdir/''${fname%.*}.html"

              # PDF
              eval "pandoc $x -t html $(template)$(css) -o $outdir/''${fname%.*}.pdf"
            done
          '';
        };
      };
    };
}
