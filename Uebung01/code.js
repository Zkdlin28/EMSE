let SEED = "666";
Nof1.SET_SEED(SEED);

let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "Datentypen-Verständnis",
        seed: SEED,

        introduction_pages: writer.stage_string_pages_commands([
            writer.convert_string_to_html_string(
                "Willkommen zum Experiment.\n\nBitte arbeite konzentriert und im Vollbildmodus ([F11])."
            ),
            writer.convert_string_to_html_string(
                "Du wirst gleich 10 Codebeispiele sehen.\n\nGib als Antwort eine Zahl ein und bestätige mit [Enter]."
            )
        ]),

        pre_run_training_instructions: writer.string_page_command(
            writer.convert_string_to_html_string("Training abgeschlossen. Jetzt beginnt das Experiment.")
        ),

        pre_run_experiment_instructions: writer.string_page_command(
            writer.convert_string_to_html_string("Bereit? Es folgen 10 Aufgaben.")
        ),

        finish_pages: [
            writer.string_page_command(
                writer.convert_string_to_html_string("Experiment beendet. Vielen Dank für deine Teilnahme!")
            )
        ],

        layout: [
            { variable: "CodeType", treatments: ["sprechende", "abstrakt"] }
        ],

        training_configuration: {
            fixed_treatments: [["CodeType", "sprechende"]],
            can_be_cancelled: false,
            can_be_repeated: false
        },

        repetitions: 10,

        measurement: Nof1.Reaction_time(Nof1.keys(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])),

        task_configuration: (t) => {
            const examples = [
                {
                    code: `function berechneSummeVonGeradenZahlenBis(obergrenze) {\n  let summe = 0;\n  for (let zaehler = 1; zaehler <= obergrenze; zaehler++) {\n    if (zaehler % 2 === 0) {\n      summe += zaehler;\n    }\n  }\n  return summe;\n}\nberechneSummeVonGeradenZahlenBis(6);`,
                    answer: "12"
                },
                {
                    code: `function f(n) {\n  let s = 0;\n  for (let i = 1; i <= n; i++) {\n    if (i % 2 === 0) {\n      s += i;\n    }\n  }\n  return s;\n}\nf(6);`,
                    answer: "12"
                },
                {
                    code: `function zaehleTeilerVon(zahl) {\n  let teilerAnzahl = 0;\n  for (let teiler = 1; teiler <= zahl; teiler++) {\n    if (zahl % teiler === 0) {\n      teilerAnzahl++;\n    }\n  }\n  return teilerAnzahl;\n}\nzaehleTeilerVon(6);`,
                    answer: "4"
                },
                {
                    code: `function t(z) {\n  let c = 0;\n  for (let i = 1; i <= z; i++) {\n    if (z % i === 0) {\n      c++;\n    }\n  }\n  return c;\n}\nt(6);`,
                    answer: "4"
                },
                {
                    code: `function findeMaximum(wert1, wert2, wert3) {\n  if (wert1 >= wert2 && wert1 >= wert3) return wert1;\n  if (wert2 >= wert1 && wert2 >= wert3) return wert2;\n  return wert3;\n}\nfindeMaximum(5, 9, 4);`,
                    answer: "9"
                },
                {
                    code: `function m(x, y, z) {\n  if (x >= y && x >= z) return x;\n  if (y >= x && y >= z) return y;\n  return z;\n}\nm(5, 9, 4);`,
                    answer: "9"
                },
                {
                    code: `function berechneFakultaet(grenzwert) {\n  let produkt = 1;\n  for (let faktor = 1; faktor <= grenzwert; faktor++) {\n    produkt *= faktor;\n  }\n  return produkt;\n}\nberechneFakultaet(4);`,
                    answer: "24"
                },
                {
                    code: `function f(n) {\n  let p = 1;\n  for (let i = 1; i <= n; i++) {\n    p *= i;\n  }\n  return p;\n}\nf(4);`,
                    answer: "24"
                },
                {
                    code: `function gibGroesserenWertZurueck(eingabe1, eingabe2) {\n  if (eingabe1 > eingabe2) return eingabe1;\n  return eingabe2;\n}\ngibGroesserenWertZurueck(7, 3);`,
                    answer: "7"
                },
                {
                    code: `function g(x, y) {\n  if (x > y) return x;\n  return y;\n}\ng(7, 3);`,
                    answer: "7"
                }
            ];

            if (typeof window.exampleCounter === "undefined") {
                window.exampleCounter = 0;
            }

            const current = examples[window.exampleCounter % examples.length];
            window.exampleCounter++;

            t.expected_answer = current.answer;

            t.do_print_task = () => {
                writer.clear_stage();
                writer.print_html_on_stage(
                    `<div class='sourcecode'><pre>${current.code}</pre></div>`
                );
            };

            t.accepts_answer_function = (given_answer) => {
                t.last_answer = given_answer.trim();
                return true;
            };

            t.do_print_error_message = (given_answer) => {
                writer.clear_stage();
                writer.clear_error();
                writer.print_html_on_error("<h1>Ungültige Eingabe: " + given_answer + "</h1>");
            };

            t.do_print_after_task_information = () => {
                writer.clear_error();
                writer.print_string_on_stage(writer.convert_string_to_html_string(
                    "Drücke [Enter], um weiterzumachen."
                ));
            };
        }
    };
};

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);
