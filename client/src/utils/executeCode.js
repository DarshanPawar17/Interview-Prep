export const executeCode = async (language, sourceCode) => {
    // Map our editor languages to Piston API language names & versions
    const languageMap = {
        javascript: { language: "javascript", version: "18.15.0" },
        python: { language: "python", version: "3.10.0" },
        cpp: { language: "c++", version: "10.2.0" },
        java: { language: "java", version: "15.0.2" },
    };

    const targetLang = languageMap[language];
    if (!targetLang) {
        return { success: false, error: "Unsupported language" };
    }

    try {
        const response = await fetch("https://emkc.org/api/v2/piston/execute", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language: targetLang.language,
                version: targetLang.version,
                files: [
                    {
                        content: sourceCode,
                    },
                ],
            }),
        });

        const data = await response.json();

        if (data.compile && data.compile.code !== 0) {
            return { success: false, output: data.compile.output, isError: true };
        }

        if (data.run) {
            return {
                success: true,
                output: data.run.output,
                isError: data.run.code !== 0,
            };
        }

        return { success: false, output: "Unknown execution error", isError: true };
    } catch (error) {
        console.error("Code execution failed:", error);
        return { success: false, output: error.message || "Failed to connect to execution engine.", isError: true };
    }
};
