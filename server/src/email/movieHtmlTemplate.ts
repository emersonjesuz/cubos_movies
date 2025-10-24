import { MovieEntity } from "../movies/MovieEntity";

export function movieHtmlTemplate(movie: MovieEntity) {
  const release = new Date(movie.getRelease()).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const html = `
 <!doctype html>
  <html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Lançamento: ${movie.getTitle()}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f6;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:680px;margin:24px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.08);">
      <tr>
        <td style="padding:18px;text-align:left;">
          <h2 style="margin:0 0 8px 0;font-size:22px;color:#111;">🎬 Lançamento: ${movie.getTitle()}</h2>
          ${
            movie.getOriginalTitle()
              ? `<p style="margin:0 0 12px 0;color:#666;font-size:14px;">Título original: ${movie.getOriginalTitle()}</p>`
              : ""
          }
          <p style="margin:0;color:#888;font-size:13px;">Data de lançamento: <strong style="color:#333;">${release}</strong></p>
        </td>
      </tr>

      <tr>
        <td style="padding:0 18px 18px 18px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="width:180px;vertical-align:top;padding-right:12px;">
                ${
                  movie.getUrlCover()
                    ? `<img src="${movie.getUrlCover()}" alt="Poster de ${movie.getTitle()}" width="160" style="display:block;border-radius:6px;max-width:100%;height:auto;" />`
                    : `<div style="width:160px;height:240px;background:#e9e9ef;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#999;font-size:14px;">Sem imagem</div>`
                }
              </td>
              <td style="vertical-align:top;">
                <p style="margin:0 0 10px 0;color:#444;font-size:14px;line-height:1.4;">${
                  movie.getSynopsis() || "Descrição indisponível."
                }</p>

                <table cellpadding="0" cellspacing="0" style="margin-top:12px;">
                  <tr>
                    <td style="padding:6px 10px;background:#f1f3f8;border-radius:6px;font-size:13px;color:#333;margin-right:8px;">Gêneros: ${movie
                      .getGenres()
                      .join(", ")}</td>
                  </tr>
                </table>

                <p style="margin:12px 0 0 0;color:#666;font-size:13px;">
                 <strong>Direção:</strong> ${movie.getDirector()}<br/>
                  <strong>Duração:</strong> ${movie.getDuration()}
                </p>

                <div style="margin-top:16px;">
                  <a href="${movie.getUrlTrailer()}" style="display:inline-block;padding:12px 18px;border-radius:6px;text-decoration:none;font-weight:600;background-color:#111;color:#fff;">Ver detalhes / Assistir trailer</a>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 18px;background:#fafafa;text-align:center;color:#999;font-size:12px;">
          © ${new Date().getFullYear()} CUBOS Filmes — Todos os direitos reservados.
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  return html;
}
