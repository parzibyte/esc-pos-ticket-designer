export const translations = {
    en: {
        editDesign: {
            giveItAName: "Design's name",
            nameExample: "For example: ticket receipt",
            goToDesigns: "Back to designs",
        },
        help: {
            title: "If you need help, I suggest, in order:",
            followFirstSteps: "Follow the guide in First steps",
            checkYoutubeTutorials: "Watch youtube tutorials: ",
            askForAVirtualMeeting: "Ask for a virtual meeting:",
        },
        title: "Thermal printer receipt designer - By Parzibyte",
        menu: {
            firstSteps: "First steps",
            myDesigns: "My designs",
            platforms: "Platforms",
            removeFooter: "Remove footer",
            settings: "Settings",
            help: "Help",
            footer: "ESC POS ticket designer developed by Parzibyte",
            changeLanguage: "Cambiar a español",
        },
        createDesign: {
            giveItAName: "Give it a name",
            nameExample: "For example: ticket receipt",
            goToDesigns: "Go to designs",
        },
        chooseAPlatform: "Choose a platform",
        selectAnOption: "Please select",
        selectAPrinter: "Printer",
        save: "Save",
        platformSetting: {
            serialPlaceholder: "Serial without whitespaces nor quotes",
            serial: "Serial (optional)",
            apiEndpointWarning: "Be careful when changing this setting. If you do not know what you are doing, don't touch it",
            apiEndpoint: "API endpoint",
            apiEndpointPlaceholder: "API endpoint",
        },
        settings: {
            developerMode: "Developer mode",
        },
        designs: {
            addDesign: "Create design",
        },
        designItem: {
            printingError: "Error while printing: ",
            importFileInvalid: "Invalid file to import",
            operations: "Operations",
            edit: "Edit",
            export: "Export",
            import: "Import...",
            delete: "Delete",
        },
        print: "Print",
        editDesignOperations: {
            emptyDesign: "Your design is empty. Please select an operation from the list",
        },
        operations: {
            Corte: {
                name: "Cut",
                description: "Feeds paper and cuts",
            },
            DefinirCaracterPersonalizado: {
                name: "Define char",
                description: "Creates an unexistent char and replaces a existing one",
            },
            Texto: {
                name: "Formatted text",
                description: "Format and print text",
            },
            Imagen: {
                name: "Image",
                description: "Select and print a picture",
            },
            Tabla: {
                name: "Text as table",
                description: "Prints text as a table",
            },
            CodigoDeBarras: {
                name: "Barcode",
                description: "Prints a barcode in different formats",
            },
            CodigoQr: {
                name: "QR",
                description: "Prints a QR",
            },
            ImagenLocal: {
                name: "Local image",
                description: "Prints an existing image in the filesystem. For example /home/parzibyte/mj.png",
            },
            CorteParcial: {
                name: "Partial cut",
                description: "Makes a partial cut",
            },
            DescargarImagenDeInternet: {
                name: "Internet image",
                description: "Download and print a public image by its URL",
            },
            DeshabilitarCaracteresPersonalizados: {
                name: "Disable custom chars",
                description: "Disable user defined characters",
            },
            DeshabilitarElModoDeCaracteresChinos: {
                name: "Disable chinese character mode",
                description: "Helpful if your printer prints chinese characters and you want to print spanish text",
            },
            TextoSimple: {
                name: "Text",
                description: "Unformatted text (format can be defined in other operations)",
            },
            EstablecerAlineacion: {
                name: "Change justification",
                description: "Change text, images, and barcodes justification",
            },
            EstablecerEnfatizado: {
                name: "Toggle emphasize",
                description: "Toggle emphasize when printing text",
            },
            EstablecerFuente: {
                name: "Change font",
                description: "Select between Font A (24x12) or Font B (17x9). Be careful, as the user defined characters are only compatible with Font A",
            },
            EstablecerImpresionAlReves: {
                name: "Upside-down character printing",
                description: "Toggle upside-down character printing",
            },
            EstablecerImpresionBlancoYNegroInversa: {
                name: "B&W reverse printing",
                description: "Toggle B&W reverse printing",
            },
            EstablecerRotacionDe90Grados: {
                name: "Rotate 90° cw",
                description: "Toggle 90° character rotate",
            },
            EstablecerSubrayado: {
                name: "Underline",
                description: "Toggle underline text",
            },
            EstablecerTamañoFuente: {
                name: "Change font size",
                description: "Change font height and width",
            },
            Feed: {
                name: "Feed",
                description: "Print and line feed",
            },
            HabilitarCaracteresPersonalizados: {
                name: "Enable user-defined characteres",
                description: "Use it when defining a new char",
            },
            HabilitarElModoDeCaracteresChinos: {
                name: "Enable chinese characters",
                description: "Select Chinese character mode",
            },
            ImprimirImagenEnBase64: {
                name: "Base64 image",
                description: "Prints an image encoded as base64",
            },
            Iniciar: {
                name: "Initialize printer",
                description: "Clears format and buffer. It should be the first operation in your designs",
            },
            Pulso: {
                name: "Generate pulse",
                description: "Outputs pulse at connector pin. Used to open cash drawer. Common values are pin 48, on time 60, off time 120",
            },

            TextoSegunPaginaDeCodigos: {
                name: "Change charcode page and print text",
                description: "Change charcode page number, encode text and print",
            },
        },
        operationComponents: {
            Texto: {
                placeholder: "Text to be printed...",
                label: "Please input the text:"
            },
            Imagen: {
                label: "Select file..."
            },
            Feed: {
                lines: "Lines",
            },
            Corte: {
                lines: "Lines",
            },
            Pulso: {
                connectorPin: "Connector pin number",
                onTime: "On time",
                offTime: "Off time",
            },
            Tabla: {
                columnSeparatorCharacter: "Col. separator",
                rowSeparatorCharacter: "Row separator",
                cornerCharacter: "Corner char",
                paddingCharacter: "Padding",
                maxColumnLength: "Max length",
                writeTheCellContent: "Cell content",
                createFromCsv: "Create from CSV...",
                maxTotalLengthWarning: "Please note: our tests indicate that, in 58mm printers, the recommended max total length is 30 chars and 45 on 80mm printers. Currently you have {chars} in total",
            },
            TextoSimple: {
                placeholder: "Text to be printed...",
                label: "Please input the text:"
            },
            CodigoDeBarras: {
                barcodeType: "Type",
                content: "Content",
                printContentUnderBarcode: "Print content as text under barcode",
                includeChecksum: "Include Checksum",
                interleaved: "Interleaved",
                fullAsciiMode: "Full ASCII mode",
                securityLevel: "Security level",
            },
            CodigoQr: {
                content: "Content",
                printContentUnderQrCode: "Print content as text under QR code",
                errorCorrection: "Error correction",
            },
            ImagenLocal: {
                absolutePath: "Absolute path",
            },
            DescargarImagenDeInternet: {
                absoluteUrl: "Absolute URL",
                absoluteUrlPlaceholder: "https://github.com/parzibyte.png",
            },
            ImprimirImagenEnBase64: {
                label: "Encoded image as base64 string"
            },
            DefinirCaracterPersonalizado: {
                replacedCharacter: "Replaced character",
                createFromImage: "Create from image"
            },
            TextoSegunPaginaDeCodigos: {
                textContent: "Text content",
                pageNumber: "Page number",
                charcodePageNameForIconv: "Charcode page (for iconv)"
            },
            EstablecerFuente: {
                font: "Font",
            },
        },
        height: "Height",
        width: "Width",
        alignment: "Alignment",
        emphasized: "Emphasized",
        underline: "Underline",
        upsideDown: "Upside down",
        rotate90Degrees: "90° rotate",
        negative: "Negative",
        alignments: {
            "Centro": "Center",
            "Izquierda": "Left",
            "Derecha": "Right",
        },
        imageSize: "Size",
        imageSizes: {
            "Normal": "Normal",
            "Doble ancho": "Double width",
            "Doble largo": "Double height",
            "Doble ancho y largo": "Double width and height",
        },
        qrErrorCorrection: {
            "Bajo": "Low",
            "Medio": "Medium",
            "Alto": "Quartile",
            "El mejor": "High",
        },
        fonts: {
            "Fuente A (24x12)": "Font A (24x12)",
            "Fuente B (9x17)": "Font B (9x17)",
        },
    },
    es: {
        editDesign: {
            giveItAName: "Nombre del diseño",
            nameExample: "Por ejemplo: recibo de venta",
            goToDesigns: "Volver a Diseños",
        },
        help: {
            title: "Si necesita ayuda, sugiero, en orden:",
            followFirstSteps: "Siga la guía en \"Primeros pasos\"",
            checkYoutubeTutorials: "Mira los tutoriales en YouTube:",
            askForAVirtualMeeting: "Solicita una reunión virtual: ",
        },
        title: "Diseñador de tickets para impresoras térmicas - Por Parzibyte",
        menu: {
            changeLanguage: "Switch to English",
            firstSteps: "Primeros pasos",
            myDesigns: "Mis diseños",
            platforms: "Plataformas",
            removeFooter: "Remover pie de página",
            settings: "Ajustes",
            help: "Ayuda",
            footer: "Diseñador de recibos para impresoras térmicas desarrollado por Parzibyte",
        },
        createDesign: {
            giveItAName: "Dale un nombre",
            nameExample: "Por ejemplo: ticket de venta",
            goToDesigns: "Ir a diseños",
        },
        chooseAPlatform: "Selecciona una plataforma",
        selectAnOption: "Por favor selecciona",
        selectAPrinter: "Impresora",
        save: "Guardar",
        platformSetting: {
            serialPlaceholder: "Serial, sin espacios ni comillas",
            serial: "Serial (opcional)",
            apiEndpointWarning: "Tenga cuidado al cambiar esta opción. Si no sabe lo que hace, no lo toque",
            apiEndpoint: "Ruta API",
            apiEndpointPlaceholder: "Ruta API",
        },
        settings: {
            developerMode: "Modo desarrollador",
        },
        designs: {
            addDesign: "Nuevo diseño",
        },
        designItem: {
            printingError: "Error al imprimir: ",
            importFileInvalid: "Archivo inválido para importar",
            operations: "Operaciones",
            edit: "Editar",
            export: "Exportar",
            import: "Importar...",
            delete: "Eliminar",
        },
        print: "Imprimir",
        editDesignOperations: {
            emptyDesign: "Tu diseño está vacío. Por favor agrega una operación de la lista",
        },
        operations: {
            Corte: {
                name: "Corte",
                description: "Avanza el papel y hace un corte",
            },
            DefinirCaracterPersonalizado: {
                name: "Crear carácter",
                description: "Define una letra que no existe y reemplaza a una existente",
            },
            Texto: {
                name: "Texto",
                description: "Dar formato e imprimir texto",
            },
            Imagen: {
                name: "Imagen",
                description: "Imprimir una imagen del dispositivo",
            },
            Tabla: {
                name: "Texto como tabla",
                description: "Imprimir tabla en forma de texto",
            },
            CodigoDeBarras: {
                name: "Codigo de barras",
                description: "Imprime un código en varios formatos",
            },
            CodigoQr: {
                name: "QR",
                description: "Imprime un QR",
            },
            ImagenLocal: {
                name: "Imagen local",
                description: "Imagen que existe en el sistema, por ejemplo, /home/parzibyte/mj.png",
            },
            CorteParcial: {
                name: "Corte parcial",
                description: "Hacer un corte parcial",
            },
            DescargarImagenDeInternet: {
                name: "Imprimir imagen de internet",
                description: "Descargar e imprimir una imagen de internet. La imagen debe ser pública",
            },
            DeshabilitarCaracteresPersonalizados: {
                name: "Deshabilitar caracteres personalizados",
                description: "Deshabilita la impresión de caracteres creados por el usuario",
            },
            DeshabilitarElModoDeCaracteresChinos: {
                name: "Deshabilitar caracteres chinos",
                description: "Deshabilita los caracteres chinos. Útil si tu impresora es china y quieres imprimir acentos",
            },
            TextoSimple: {
                name: "Texto sin formato",
                description: "Texto simple cuyo formato puede definirse en otras operaciones",
            },
            EstablecerAlineacion: {
                name: "Cambiar alineación",
                description: "Cambiar alineación del texto, imágenes y códigos de barras",
            },
            EstablecerEnfatizado: {
                name: "Alternar enfatizado",
                description: "Cambiar el estado enfatizado del texto",
            },
            EstablecerFuente: {
                name: "Establecer fuente",
                description: "Cambiar entre la fuente A (24x12) y B (17x9). Tener cuidado porque los caracteres personalizados solo funcionan con la fuente A",
            },
            EstablecerImpresionAlReves: {
                name: "Establecer impresión al revés",
                description: "Alternar modo de impresión al revés",
            },
            EstablecerImpresionBlancoYNegroInversa: {
                name: "Alternar impresión B&N",
                description: "Alternar modo de impresión blanco y negro inversa",
            },
            EstablecerRotacionDe90Grados: {
                name: "Rotar texto 90°",
                description: "Alternar rotación de texto de 90°",
            },
            EstablecerSubrayado: {
                name: "Subrayado",
                description: "Alternar subrayado de texto",
            },
            EstablecerTamañoFuente: {
                name: "Cambiar tamaño de fuente",
                description: "Cambiar ancho y alto del texto",
            },
            Feed: {
                name: "Feed",
                description: "Avanzar el papel",
            },
            HabilitarCaracteresPersonalizados: {
                name: "Habilitar caracteres personalizados",
                description: "Habilita la impresión y reemplazo de caracteres definidos por el usuario",
            },
            HabilitarElModoDeCaracteresChinos: {
                name: "Habilitar los caracteres chinos",
                description: "Habilita la impresión de caracteres chinos",
            },
            ImprimirImagenEnBase64: {
                name: "Imagen base64",
                description: "Imprime una imagen a partir de su representación como base64",
            },
            Iniciar: {
                name: "Iniciar impresora",
                description: "Limpia el formato y búfer. Útil para reiniciar los estilos. Se recomienda colocarla siempre al inicio de un diseño",
            },
            Pulso: {
                name: "Enviar pulso",
                description: "Envía un pulso eléctrico que normalmente es para abrir el cajón. Los valores más comunes son pin 48, tiempo encendido 60, tiempo apagado 120",
            },

            TextoSegunPaginaDeCodigos: {
                name: "Texto acentuado",
                description: "Permite imprimir texto con acentos. Recomiendo deshabilitar los caracteres chinos y probar todas las combinaciones",
            },
        },
        operationComponents: {
            Texto: {
                placeholder: "Texto para imprimir",
                label: "Por favor, escriba el texto"
            },
            Imagen: {
                label: "Seleccionar archivo..."
            },
            Feed: {
                lines: "Líneas",
            },
            Corte: {
                lines: "Líneas",
            },
            Pulso: {
                connectorPin: "Número de pin",
                onTime: "Duración encendido",
                offTime: "Duración apagado",
            },
            Tabla: {
                columnSeparatorCharacter: "Sep. columna",
                rowSeparatorCharacter: "Sep. Fila",
                cornerCharacter: "Sep. esquina",
                paddingCharacter: "Relleno",
                maxColumnLength: "Máxima longitud",
                writeTheCellContent: "Contenido de la celda",
                createFromCsv: "Crear desde CSV...",
                maxTotalLengthWarning: "Nota: nuestras pruebas indican que, en impresoras de 58mm, el ancho máximo total es de 30 caracteres, y de 45 en impresoras de 80mm. Actualmente usted está usando {chars} caracteres",
            },
            TextoSimple: {
                placeholder: "Texto para imprimir...",
                label: "Por favor, escriba el texto:"
            },
            CodigoDeBarras: {
                barcodeType: "Tipo",
                content: "Contenido",
                printContentUnderBarcode: "Imprimir contenido debajo como texto",
                includeChecksum: "Incluir suma de verificación",
                interleaved: "Intercalado",
                fullAsciiMode: "Modo ASCII completo",
                securityLevel: "Nivel de seguridad",
            },
            CodigoQr: {
                content: "Contenido",
                printContentUnderQrCode: "Imprimir contenido debajo como texto",
                errorCorrection: "Corrección",
            },
            ImagenLocal: {
                absolutePath: "Ruta absoluta",
            },
            DescargarImagenDeInternet: {
                absoluteUrl: "URL absoluta",
                absoluteUrlPlaceholder: "https://github.com/parzibyte.png",
            },
            ImprimirImagenEnBase64: {
                label: "Imagen codificada como cadena en base64"
            },
            DefinirCaracterPersonalizado: {
                replacedCharacter: "Carácter remplazado",
                createFromImage: "Crear desde imagen"
            },
            TextoSegunPaginaDeCodigos: {
                textContent: "Texto",
                pageNumber: "Número de página",
                charcodePageNameForIconv: "Página de códigos (para iconv)"
            },
            EstablecerFuente: {
                font: "Fuente",
            },
        },
        height: "Alto",
        width: "Ancho",
        alignment: "Alineación",
        emphasized: "Enfatizado",
        underline: "Subrayado",
        upsideDown: "Invertido",
        rotate90Degrees: "Rotar 90°",
        negative: "B&N invertido",
        alignments: {
            "Centro": "Centro",
            "Izquierda": "Izquierda",
            "Derecha": "Derecha",
        },
        imageSize: "Tamaño",
        imageSizes: {
            "Normal": "Normal",
            "Doble ancho": "Doble ancho",
            "Doble largo": "Doble alto",
            "Doble ancho y largo": "Doble ancho y largo",
        },
        qrErrorCorrection: {
            "Bajo": "Bajo",
            "Medio": "Medio",
            "Alto": "Alto",
            "El mejor": "El mejor",
        },
        fonts: {
            "Fuente A (24x12)": "Fuente A (24x12)",
            "Fuente B (9x17)": "Fuente B (9x17)",
        },
    }
}