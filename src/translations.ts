export const translations = {
    en: {
        dropToSwap: "Drop to swap",
        removeFooter: {
            getALicense: "Get a license and support the plugin development",
            hopeDesignerIsUseful: "Hi. I hope the designer is useful for you. You can remove the plugin's footer by buying a license",
            platform: "Platform",
            monthlyPrice: "Monthly price",
            mexicanPeso: "MXN (Mexican peso)",
            pricesAreMonthly: "Prices are monthly-based (30 days)",
            licenseOnlyRemovesFooter: "License only removes receipt footers. Not having it does not affect anything at all. If the plugin does not work without license, it won't neither work with a license",
            wantToBuy: "I want to buy a license",
            hidePaymentMethods: "Hide payment methods",
            wantToGetInTouch: "First I want to get in touch",
            hideContact: "Hide contact",
            getInTouch: "Best way to get in touch with me is through my webpage: {webpageLink}",
            moreWaysToGetInTouch: "You can also send me a mail to parzibyte at gmail dot com, and in Telegram you can find me as parzibyte",
            pricesAreInMexicanPesos: "Prices are specified in mexican pesos. You can always use an online currency converter, just make sure you send the right amount",
            paymentMethods: "Currently I accept payment through Paypal and wire transfer. Wire transfer will only work if you reside in México. To make the payment through Paypal, please follow this link: {paypalLink}. To make a wire transfer, you will found my bank details below: {bankDetails}Once the payment is done, please get in touch with me by using the contact button",
            fullName: "Luis Cabrera Benito",
            myNameIs: "My name is ",
            myClabeIs: "Account CLABE is",
            myAccountNumberIs: "Account number is",
            myCardNumberIs: "Card number is",
            clabe: "1271 8001 6673 3458 66",
            accountNumber: "9546 1667 3345 86",
            cardNumber: "4198 2101 6489 6028",
            faq: "FAQ",
            faqList: {
                "paymentDone": {
                    question: "What happens when I make the payment?",
                    answer: "Once you contact me and send me the payment receipt, I will send you the license in up to 24 hours. License is a string that you must put in 'Platforms' in 'License' field. The license's term will start counting on the date you made the payment, if you want it to start on another date please indicate it when getting in touch with me",
                },
                "bothPlatforms": {
                    question: "Can I have a license for more than one platform?",
                    answer: "Sure, licenses are handled individually, so you can have one for Android and other for Desktop",
                },

                "licenseInArchitecture": {
                    question: "Will my license work on my platform with my printer under any circumstance?",
                    answer: "I suggest you to test the designer wherever you plan to use it with the license. If it works withouth license, it surely will work with a license",
                },
                printerLimit: {
                    question: "Is there any printer or receipt number limit?",
                    answer: "No. The only limit is the license term. While your license is valid, you can print designs on any printer without any limit",
                },
                whatIsAMonth: {
                    question: "What is 'a month'?",
                    answer: "For these cases, a month is defined as 30 days",
                },
                unlimitedLicense: {
                    question: "Can I have an unlimited license?",
                    answer: "No, but there's no limit in the months that your license can last, so you can buy a license for 10, 100, 1000 or 10000 months",
                },
                expiredLicense: {
                    question: "What happens when my license expires?",
                    answer: "The footer will appear again. The designer and plugin will work as they work without license and they won't stop working"
                },
                renewLicense: {
                    question: "Do I have to change the license once I renew it?",
                    answer: "Yes, once your license expires and you renew it, I will send you a new license",
                },
                shareLicense: {
                    question: "Can I share my license?",
                    answer: "No. You can use the license for your personal use only (there's no device nor printer limit, as long as they belong to you). Sharing your license may lead to its cancellation with no refunds"
                },
                sourceCode: {
                    question: "Can I explore the designer and plugin source code?",
                    answer: "The designer's code is open source and you can explore it in the following link: {designerCodeLink}. For plugin's source code, currently only version 1: {version1PluginCode} and version 2: {version2PluginCode} are available; version 3 is not available at this moment"
                },
            }
        },
        firstSteps: {
            pluginCompatibility: "Please note: the plugin is compatible with thermal printers that use ESC POS commands. It is not compatible with label printers (or, at least, I haven't tested on them). In Desktop platform, the plugin is only compatible with USB printers. On Android, the plugin is only compatible with Bluetooth printers ",
            android: {
                pairPrinter: {
                    title: "Pair printer",
                    pairPrinter: "If you have never printed with your printer, you should follow these steps. Turn on your Bluetooth and the printer. If the manual or manufacturer indicates the steps to put the printer in discovery mode, you must follow the steps.",
                    goToBluetooth: "Go to Bluetooth settings and choose {option}, in this example the printer's name is {printerName}",
                    syncNewDevice: "Sync new device",
                    printerName: "MTP-II",
                    pairingCode: "If a pairing pin is required, check your printer's manual or try with the most common combinations like 1234, 0000, 1111 and so on"
                },
                downloadPlugin: {
                    title: "Download plugin",
                    goToDownloadLink: "Navigate to the following link, go to {assets} and download {pluginName}: {downloadLink}",
                    assets: "Assets",
                    pluginName: "PluginImpresorasTermicasBT_1.1.apk",
                    downloadLink: "https://github.com/parzibyte/plugin-impresora-termica-bt-android/releases/latest/",
                    pluginIsSafe: "Remember: the plugin does not contain any kind of virus but in some cases you need to force the download. For example, in Google Chrome, you must choose \"{forceDownload}\"",
                    forceDownload: "Download anyway",
                    onceDownloaded: "Once downloaded, you can go to the next step"
                },
                installPlugin: {
                    title: "Install plugin",
                    locatePlugin: "Now that you have downloaded the plugin, you should install it. The web browser should give you the option, but if it doesn't, use a file explorer to locate the downloaded app. {installPermission}",
                    installPermission: "In some cases, you must give app permission to install APK. For example, if you are using Google Chrome you must go to settings:",
                    trustSource: "Trust source",
                    allowInstall: "Read and allow installation",
                    install: "Install:",
                    forceInstall: "This settings can vary from OS to OS. It is up to you to force the install and give the required permissions",
                    appPermissions: "Once installed, open the app and allow every permission it asks for. If the app closes, open it again until you can see a screen like the next one where you can read {pluginRunning}",
                    pluginRunning: "Plugin funcionando correctamente",
                    nextStep: "Once you have reached this step, you can go to the next one",
                    allowBackgroundExecution: "From here, every time you want to use the designer, you must run the plugin in the background. Make sure the plugin says {pluginRunning} and do not close the app, just let it running in the background"
                },
                testFromPlugin: {
                    title: "Print test from plugin",
                    considerations: "Now that the plugin is running, please consider the following:",
                    printerPaired: "The printer must be paired before you can use it in the plugin",
                    pluginRunningInTheBackground: "It is required to execute the plugin in the background. Check your battery economizer and app priority",
                    runPluginAndGoToHome: "You must leave the plugin in the {pluginRunning} screen and from there go to home (minimize app)",
                    addPrinter: "Every time that you want to add a new printer so it can appear in the list, follow the next steps, but don't forget to go back to main screen (the one that says {pluginRunning}) and minimize the app from there",
                    makeTest: "Turn on the Bluetooth and the printer. Click {showPrinters} and wait for the list to load. If the app asks for permission again, allow it. Once you see your printer's name and mac in the list, click {printTest}. In this case, the printer's name is {printerName}",
                    showPrinters: "Ver impresoras disponibles",
                    printTest: "Imprimir prueba",
                    refreshList: "If your printer does not appear in the list, make sure you have paired it before, turn on the bluetooth and the printer, finally touch the button to refresh the list",
                    printedSuccessfully: "If your printer is compatible with the plugin, you should see a receipt like the following. If it is printed ok, you are ready to use the designer, now go to the next step"

                },
                testFromDesigner: {
                    title: "Print test",
                    pluginNotRunning: "It looks like the plugin is not running. Please re-check the previous steps to download and execute it"
                }
            },
            desktop: {
                manufacturerNote: "If your printer includes an installation guide, follow it and go to the next step to share it. If your printer does not have a guide or does not work even with the manufacturer's instructions, follow the next steps. Remember to turn on the printer and connect it via USB",
                installPrinter: {
                    title: "Install printer",
                    windows10: {
                        title: "Windows 8, 8.1 and 10",
                        goToControlPanel: "Go to the {controlPanel}, choose {printers}, once there choose {addPrinter}",
                        addManually: "Wait until the {printerIsNotInTheList} option appears and click it",
                        controlPanel: "Control panel",
                        printers: "Printers and devices",
                        addPrinter: "Add printer",
                        printerIsNotInTheList: "Printer is not in the list",
                    },
                    windows11: {
                        title: "Windows 11",
                        goToControlPanel: "In the Windows Menu search and choose {printers}",
                        printers: "Printers and devices",
                        clickAddDevice: "Click {addDevice}",
                        addDevice: "Add device",
                        addManually: "Wait until the {printerIsNotInTheList} option appears and click it",
                        printerIsNotInTheList: "Printer is not in the list",
                    },
                    linux: {
                        title: "Linux and Raspberry Pi OS",
                        commandWarning: "Every command will be executed in the terminal. Remember: some of them will need superuser access",
                        showPrinters: "Execute: {commandListPrinters} Your printer should appear as lpX where X is a number. If there are many of them, you may try with lp1, lp2, and so on. In my case is {myPrinter}",
                        myPrinter: "lp1",
                        checkGroup: "Execute: {commandStat} and check the group that appears near {gid}. In the image, the group is {group}",
                        gid: "Gid Number / Group",
                        group: "lp",
                        addUser: "Add your current user to the group. In my case, my user is {myUser}, so the command is: {commandToAddUser} Remember that in your case the group, printer and user may vary",
                        myUser: "parzibyte",
                        reboot: "Reboot your computer by using the way or command you like",
                        testPrinter: "Execute the next command to make a test. The command assumes that your printer's name is {printerName}, if in your case it is another printer, change the command accordingly {commandToPrint}",
                        printedSuccessfully: "If the test page is printed, you can move to the next step. Remember that, in some cases, the paper does not feed, so you should feed the paper and check your printer to make sure the printer was successful",

                    },
                    commonInstructionsForWindows: {
                        manuallyAdd: "A new window will open. There, chose {addLocalPrinter} and then choose {next}",
                        addLocalPrinter: "Add local printer with manual configuration",
                        next: "Next",
                        setupPort: "In the next window choose the USB00X where X is a number. If there is more than one port and later the printer test does not work, come back to this step and change the port. In my case there's only one port so I will take it",
                        setupDrivers: "In the next window choose {generic} for {manufacturer} and then choose {genericTextOnly} in {printers}. Finally, click {next}",
                        manufacturer: "Manufacturer",
                        printers: "Printers",
                        generic: "Generic",
                        genericTextOnly: "Generic / Text Only",
                        setupName: "Now it's time to give your printer a name. {nameWarning}. Then, click {next}",
                        nameWarning: "It is very important to use only letters for naming your printer",
                        printTest: "To finish, print a page test. If the page is printed successfully, then go to the next step. If it is not printed, go back to the previous steps and check every setting, maybe you have to choose another port"
                    }
                },
                sharePrinter: {
                    title: "Share printer",
                    shareNote: "We will share the printer so the plugin can detect it. This is not intended for network printing, but it is a necessary step",
                    windows10: {
                        goToPrinters: "Once you have installed your printer, go to {controlPanel} and then {printers}. Once there, right click on the printer you want to share and choose {properties}",
                        controlPanel: "Control panel",
                        printers: "Printers and devices",
                        properties: "Printer properties",
                        goToShareTab: "Go to {shareTab} and if the {shareThisPrinter} option is disabled, enable it by clicking on {changeShareOptions}",
                        shareTab: "Sharing",
                        shareThisPrinter: "Share this printer",
                        changeShareOptions: "Change Sharing options",
                        finishSharing: "Once you have enabled printer sharing, check the {shareThisPrinter} checkbox and write the same name {nameWarning}. It must have the same name as your printer. {imageShared} Finally click on {ok} and your printer will be shared",
                        ok: "Accept",
                        nameWarning: "by using only letters",
                    },
                    windows11: {
                        goToPrinters: "Once you have installed your printer, search and choose {printers} in the Windows Menu. Once there, click on the printer you want to share. That will take you to a {printerSettings} tab, click on {properties}",
                        printers: "Printers and devices",
                        printerSettings: "Printer settings",
                        properties: "Printer properties",
                        goToShareTab: "Go to {shareTab} and if the {shareThisPrinter} option is disabled, enable it by clicking on {changeShareOptions}",
                        shareTab: "Sharing",
                        shareThisPrinter: "Share this printer",
                        changeShareOptions: "Change Sharing options",
                        finishSharing: "Once you have enabled printer sharing, check the {shareThisPrinter} checkbox and write the same name {nameWarning}. It must have the same name as your printer. {imageShared} Finally click on {ok} and your printer will be shared. Steps are shown in the following image:",
                        ok: "Accept",
                        nameWarning: "by using only letters",
                    },
                    linux: {
                        note: "On Debian based distros and Raspberry Pi OS this step is not necessary"
                    }
                },
                downloadAndExecutePlugin: {
                    title: "Download and run plugin",
                    windows: {
                        title: "Windows 8, 8.1, 10 and 11",
                        navigateToPluginDownload: "Navigate to the following link: {link} and once there go to the bottom until you found the Assets section",
                        unknownArch: "If you don't know your OS architecture, download {plugin64}",
                        plugin64: "plugin_v3.2.1.zip",
                        plugin32: "plugin_v3.2.1_si.zip",
                        knownArch: "If you know your OS architecture, you can choose {plugin64} for 64 bits or {plugin32} for 32 bits",
                        compatibility: "If you have compatibility issues later, maybe your arch is wrong. In that case, download {plugin32}",
                        antivirusesWarning: "In some cases, your web browser or antivirus will block the download. {pluginIsSecure} and is up to you to force the download",
                        pluginIsSecure: "The plugin does not contain any kind of virus",
                        onceDownloaded: "Once downloaded, if it is a zip file, you must extract it. On some systems the option will appear with a right-click and in other systems you can use WinZip, 7-Zip and so on. The extraction is out of this guide, but {mandatoryToExtract}",
                        mandatoryToExtract: "It is mandatory to extract it and execute it, and not only opening directly from the extractor software",
                        onceExtracted: "Once extracted, you will have an executable file and in some cases a DLL file (that DLL must be always in the same folder as the plugin)",
                        secondWarning: "Again, sometimes Windows or your antivirus will block the plugin execution. You must click {moreInfo}, {advancedOptions} or the option that allows you to force the execution. That may vary among operating systems and antiviruses. {givePermissions}, for example, in the next image I'm forcing the execution:",
                        moreInfo: "More info",
                        advancedOptions: "Advanced options",
                        givePermissions: "You must give the plugin every permission it needs. It is totally safe",
                        executionError: "If you have executed the plugin, but a execution/compatibility error appears (and not a security one) then download the {plugin32} file",
                        noErrors: "If there is no error, go to the following step. The plugin does not open any window (only when listing printers)",
                        finalCheck: "As a final check, you can open task manager {keyCommand}, go to {details} and check if the plugin is running. It should have the same name as the executable. Example:",
                        details: "Details",

                    },
                    linux: {
                        title: "Linux and Raspberry Pi OS",
                        navigateToPluginDownload: "Go to the next link: {link} and once there, go to the bottom until you see the Assets section",
                        debianBased: "If you use a debian based OS, choose {plugin_debian}",
                        raspberryPiOSBased: "If you use Raspberry Pi OS, choose {plugin_raspberry}",
                        debian: "plugin_v3.2.1_d.zip",
                        raspberryPiOS: "plugin_v3.2.1_r.zip",
                        forceDownload: "In some cases, your web browser or antivirus will block the download. {pluginSafe}, and is up to you to force the download",
                        pluginSafe: "The plugin is totally safe and does not contain any kind of virus",
                        onceDownloaded: "Once downloaded, if it is a zip file, you must extract it. If you have the {zipUtility} utility installed, you can execute: {unzipCode} (changing the downloaded file's name accordingly)",
                        onceExtracted: "Once extracted you will get an executable file. Sometimes it will be inside a folder created by the unzip software. Give it execution permissions with: {codeToGivePermission}",
                        execute: "Make sure you are executing in the same path as the plugin (changing with {cd} as necessary) and execute {codeToExecutePlugin} (remember that, in your case, the plugin's name may vary)",
                        exampleLook: "For example, it can look like this:",
                        zipName: "plugin_name.zip",
                        pluginsName: "plugin_name",
                        backgroundExecute: "If you want to execute it in the background, execute: {codeToRunInBackground}",
                        goToNextStep: "In case there's no error message and the plugin is executing successfully, go to the next step",

                    },
                },
                printTest: {
                    title: "Print test",
                },
            },
        },
        platforms: {
            Android: {
                name: "Android",
                description: "Print using Bluetooth on Android",
            },
            Desktop: {
                name: "Desktop",
                description: "Print in USB printers on Windows, Linux and Raspberry Pi OS",
            },
        },
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
                description: "Feed and  cut paper",
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
        dropToSwap: "Suelta para intercambiar",
        removeFooter: {
            getALicense: "Consigue una licencia y ayuda al desarrollo",
            hopeDesignerIsUseful: "Hola. Espero que el diseñador te esté siendo útil. Puedes remover el pie de página comprando una licencia",
            platform: "Plataforma",
            monthlyPrice: "Costo mensual",
            mexicanPeso: "MXN (Peso mexicano)",
            pricesAreMonthly: "Los precios son mensuales de 30 días",
            licenseOnlyRemovesFooter: "La licencia solo remueve el pie de página. No tenerla no afecta en nada. Si el plugin no funciona sin licencia, tampoco lo hará al tener una licencia",
            wantToBuy: "Comprar una licencia",
            hidePaymentMethods: "Ocultar métodos de pago",
            wantToGetInTouch: "Primero quiero contactarte",
            hideContact: "Ocultar contacto",
            getInTouch: "La mejor manera de contactarme es a través de mi página web: {webpageLink}",
            moreWaysToGetInTouch: "También puedes enviarme un correo a parzibyte arroba gmail punto com, y en telegram me encuentras como parzibyte",
            pricesAreInMexicanPesos: "Los precios son especificados en pesos mexicanos. Tú puedes usar un conversor de divisas en línea para hacer la conversión, solo asegúrate de enviar el monto correcto",
            paymentMethods: "Actualmente acepto pagos a través de Paypal y transferencia bancaria. La transferencia solo funcionará si resides en México. Para hacer el pago por PayPal, por favor sigue el siguiente enlace: {paypalLink}. Para hacer una transferencia bancaria por favor revisa los detalles de mi cuenta bancaria a continuación. {bankDetails}Una vez que hayas hecho el pago, contáctame usando el botón",
            fullName: "Luis Cabrera Benito",
            myNameIs: "Mi nombre es",
            myClabeIs: "Mi CLABE es",
            myAccountNumberIs: "Mi número de cuenta es",
            myCardNumberIs: "Mi número de tarjeta es",
            clabe: "1271 8001 6673 3458 66",
            accountNumber: "9546 1667 3345 86",
            cardNumber: "4198 2101 6489 6028",
            faq: "Preguntas frecuentes",
            faqList: {
                "paymentDone": {
                    question: "¿Qué pasa cuando hago el pago?",
                    answer: "Una vez que me contactes para enviarme el método de pago, te enviaré tu licencia en un plazo de hasta 24 horas. La licencia es una cadena que debes colocar en 'Plataformas' dentro de 'Serial'. El período de la licencia comenzará a contar el día que hagas el pago; si prefieres que su plazo comience otro día, avísame al enviar el pago",
                },
                "bothPlatforms": {
                    question: "¿Puedo tener una licencia para más de una plataforma?",
                    answer: "Claro. Las licencias se manejan independientemente, así que puedes tener una para Android y otra para Desktop",
                },
                "licenseInArchitecture": {
                    question: "¿Mi licencia funcionará en mi plataforma con mi impresora bajo cualquier circustancia?",
                    answer: "Sugiero que pruebes el diseñador donde sea que planees usarlo con la licencia. Si funciona sin licencia, funcionará con ella",
                },
                printerLimit: {
                    question: "¿Hay algún límite de impresoras o tickets impresos?",
                    answer: "No. El único límite es el plazo de la licencia. Mientras tu licencia sea válida, puedes imprimir diseños en cualquier impresora sin límites",
                },
                whatIsAMonth: {
                    question: "¿Qué es 'un mes?",
                    answer: "Para estos casos, un mes se define como un período de 30 días",
                },
                unlimitedLicense: {
                    question: "¿Puedo tener una licencia ilimitada?",
                    answer: "No, pero no hay un límite de meses al contratar una licencia, así que puedes contratar una licencia por 10, 100, 1000 o 10000 meses",
                },
                expiredLicense: {
                    question: "¿Qué pasa cuando mi licencia expira?",
                    answer: "El pie de página aparecerá de nuevo. El diseñador y el plugin van a funcionar como trabajan sin licencia, y ninguno de ellos dejará de funcionar"
                },
                renewLicense: {
                    question: "¿Tengo que cambiar la licencia una vez que la renueve?",
                    answer: "Sí, una vez que tu licencia expire y la renueves, te enviaré una nueva licencia",
                },
                shareLicense: {
                    question: "¿Puedo compartir mi licencia?",
                    answer: "No. Puedes usar la licencia solo para tu uso personal (no hay límite de impresoras ni dispositivos, mientras ellos te pertenezcan). Compartir tu licencia podría causar que la misma sea cancelada sin reembolsos"
                },
                sourceCode: {
                    question: "¿Puedo explorar el código fuente del diseñador y del plugin?",
                    answer: "El código fuente del diseñador es código abierto y lo puedes explorar en el siguiente enlace: {designerCodeLink}. Para el código fuente del plugin, actualmente solo la versión 1: {version1PluginCode} y la versión 2: {version2PluginCode} están disponibles. El código fuente de la versión 3 no está disponible en este momento"
                },
            }
        },
        firstSteps: {
            pluginCompatibility: "Nota: el plugin es compatible con impresoras térmicas con el protocolo ESC POS; no es compatible con impresoras de etiquetas (o al menos no he probado). En Desktop solo es compatible con impresoras USB conectadas al lugar donde el plugin está en ejecución; en Android solo es compatible con impresoras Bluetooth",
            android: {
                pairPrinter: {
                    title: "Emparejar impresora",
                    pairPrinter: "Si nunca has impreso con tu impresora, debes seguir estos pasos. Enciende tu Bluetooth y la impresora. Si el manual o fabricante indican los pasos para colocar la impresora en modo descubrimiento, debes seguir los pasos.",
                    goToBluetooth: "Ve a tus ajustes Bluetooth y elige {option}, en este ejemplo la impresora es la {printerName}:",
                    syncNewDevice: "Sincronizar nuevo dispositivo",
                    printerName: "MTP-II",
                    pairingCode: "Si te pide algún código para realizar el emparejamiento revisa el manual de usuario o prueba con las combinaciones más comunes como 1234, 0000, 1111, etcétera. Eso depende de tu impresora"
                },
                downloadPlugin: {
                    title: "Descargar plugin",
                    goToDownloadLink: "Navega al siguiente enlace, ve a {assets} y descarga {pluginName}: {downloadLink}",
                    assets: "Assets",
                    pluginName: "PluginImpresorasTermicasBT_1.1.apk",
                    downloadLink: "https://github.com/parzibyte/plugin-impresora-termica-bt-android/releases/latest/",
                    pluginIsSafe: "Recuerda: el plugin no contiene ningún tipo de virus pero en algunos casos necesitas forzar la descarga. Por ejemplo, en Google Chrome debes elegir \"{forceDownload}\"",
                    forceDownload: "Descargar de todos modos",
                    onceDownloaded: "Una vez descargado puedes navegar al siguiente paso"
                },
                installPlugin: {
                    title: "Instalar plugin",
                    locatePlugin: "Ahora que has descargado el plugin debes instalarlo. El navegador web debería darte la opción, pero si no te la da, usa un explorador de archivos para localizar la aplicación recién descargada. {installPermission}",
                    installPermission: "En algunos casos debes darle permisos de instalación a la aplicación que usaste para descargar el plugin. Por ejemplo, si usas Google Chrome, debes ir a Ajustes:",
                    trustSource: "Confiar en esta fuente",
                    allowInstall: "Leer y permitir la instalación",
                    install: "Instalar:",
                    forceInstall: "Estos ajustes pueden variar entre sistemas. Es tu responsabilidad forzar la instalación y brindar los permisos necesarios",
                    appPermissions: "Una vez instalada, abre la aplicación del plugin y permite todos los permisos que pida. Si la aplicación se cierra, ábrela de nuevo hasta que veas una pantalla como la siguiente donde se puede leer {pluginRunning}",
                    pluginRunning: "Plugin funcionando correctamente",
                    nextStep: "Una vez que has llegado a este punto, puedes avanzar al siguiente",
                    allowBackgroundExecution: "A partir de aquí, cada vez que quieras usar el diseñador debes ejecutar el plugin en seegundo plano. Asegúrate de que el plugin diga{pluginRunning} y no cierres la aplicación, solo déjala en segundo plano y minimízala"
                },
                testFromPlugin: {
                    title: "Prueba de impresión (plugin)",
                    considerations: "Ahora que el plugin se está ejecutando por favor considera lo siguiente:",
                    printerPaired: "La impresora debe estar emparejada antes de que puedas usarla con el plugin",
                    pluginRunningInTheBackground: "Es obligatorio ejecutar el plugin en segundo plano. Revisa tu optimizador de batería y la prioridad que se le da a la app",
                    runPluginAndGoToHome: "Debes dejar el plugin en la pantalla que dice {pluginRunning} y, desde ahí, ir al inicio (minimizar la app)",
                    addPrinter: "Cada vez que quieras agregar una nueva impresora para que aparezca en la lista, sigue los siguientes pasos, pero no olvides volver a la pantalla principal (la que dice {pluginRunning}) y minimizar la app desde ahí",
                    makeTest: "Enciende el Bluetooth de tu dispositivo y la impresora. Haz clic en {showPrinters} y espera a que la lista cargue. Si la aplicación pide permiso de nuevo, bríndalo. Una vez que veas la MAC y nombre de tu impresora, haz clic en {printTest}. En este caso el nombre de mi impresora es {printerName}",
                    showPrinters: "Ver impresoras disponibles",
                    printTest: "Imprimir prueba",
                    refreshList: "Si tu impresora no aparece en la lista asegúrate de que la has emparejado antes, enciende el bluetooth y la impresora y finalmente toca el botón para refrescar la lista",
                    printedSuccessfully: "Si tu impresora es compatible con el plugin, deberías ver un recibo como el siguiente. Si se imprime correctamente, estás listo para usar el diseñador, ahora avanza al siguiente paso"
                },
                testFromDesigner: {
                    title: "Prueba de impresión",
                    pluginNotRunning: "Parece que el plugin no se está ejecutando. Por favor revisa los pasos anteriores para descargarlo y ejecutarlo"
                }
            },
            desktop: {
                manufacturerNote: "Si tu impresora incluye una guía de instalación, síguela y avanza al siguiente paso para compartirla. Si tu impresora no tiene una guía o no funciona incluso con las instrucciones del fabricante, sigue los siguientes pasos. Recuerda encender tu impresora y conectarla con su cable USB.",
                installPrinter: {
                    title: "Instalar impresora",
                    windows10: {
                        title: "Windows 8, 8.1 y 10",
                        goToControlPanel: "Ve al {controlPanel}, elige {printers}, una vez ahí elige {addPrinter}",
                        addManually: "Espera hasta que aparezca la opción {printerIsNotInTheList} y haz clic en ella",
                        controlPanel: "Panel de control",
                        printers: "Dispositivos e impresoras",
                        addPrinter: "Agregar una impresora",
                        printerIsNotInTheList: "La impresora deseada no está en la lista",
                    },
                    windows11: {
                        title: "Windows 11",
                        goToControlPanel: "En el menú de inicio busca y elige {printers}",
                        printers: "Impresoras y escáneres",
                        clickAddDevice: "Haz clic en {addDevice}",
                        addDevice: "Agregar dispositivo",
                        addManually: "Espera hasta que la opción {printerIsNotInTheList} aparezca y haz clic en ella",
                        printerIsNotInTheList: "La impresora deseada no está en la lista",
                    },
                    linux: {
                        title: "Linux y Raspberry Pi OS",
                        commandWarning: "Todos los comandos serán ejecutados en la terminal. Recuerda: algunos de ellos necesitarán permiso de superusuario",
                        showPrinters: "Ejecuta: {commandListPrinters} Tu impresora debería aparecer como lpX donde X es un número. Si hay varios dispositivos, tendrás que probar con lp1, lp2, etcétera. En mi caso mi impresora es{myPrinter}",
                        myPrinter: "lp1",
                        checkGroup: "Ejecuta: {commandStat} y revisa el grupo que aparece cerca de {gid}. En la imagen, el grupo es {group}",
                        gid: "Gid Number / Group",
                        group: "lp",
                        addUser: "Agrega tu usuario actual al grupo. En mi caso, mi usuario es {myUser}, así que el comando es: {commandToAddUser} Recuerda que en tu caso el grupo, impresora y usuario pueden variar",
                        myUser: "parzibyte",
                        reboot: "Reinicia tu computadora usando la manera o comando que prefieras",
                        testPrinter: "Ejecuta el siguiente comando para hacer una prueba de impresión. El comando supone que el nombre de tu impresora es {printerName}, si, en tu caso es otra impresora, cambia el comando como sea necesario{commandToPrint}",
                        printedSuccessfully: "Si la página de prueba es impresa, puedes navegar al siguiente paso. Recuerda que, en algunos casos, el papel no avanza, así que debes avanzarlo manualmente para revisar que la impresión fue correcta",
                    },
                    commonInstructionsForWindows: {
                        manuallyAdd: "Se abrirá una nueva ventana. Ahí, elige {addLocalPrinter} y luego elige {next}",
                        addLocalPrinter: "Agregar una impresora local o de red con configuración manual",
                        next: "Siguiente",
                        setupPort: "En la siguiente ventana elige USB00X donde X es un número. Si hay más de un puerto y después en la prueba de impresión la impresora no funciona, vuelve a este paso y cambia el puerto. En mi caso solo hay un puerto así que tomaré ese",
                        setupDrivers: "En la siguiente ventana elige {generic} para {manufacturer} y luego elige {genericTextOnly} en {printers}. Finalmente haz clic en {next}",
                        manufacturer: "Fabricante",
                        printers: "Impresoras",
                        generic: "Generic",
                        genericTextOnly: "Generic / Text Only",
                        setupName: "Es momento de darle un nombre a tu impresora. {nameWarning}. Después haz clic en {next}",
                        nameWarning: "Es muy importante que utilices solo letras para nombrar a tu impresora. No espacios ni otro tipo de caracteres",
                        printTest: "Para terminar, imprime una página de prueba. Si la página se imprime correctamente, ve al siguiente paso. Si no se imprime nada, vuelve a los pasos anteriores y revisa cada paso, tal vez tienes que elegir otro puerto"
                    }
                },
                sharePrinter: {
                    title: "Compartir impresora",
                    shareNote: "Compartiremos la impresora para que el plugin la detecte. Esto no es para que se pueda imprimir en red local, pero es un paso obligatorio",
                    windows10: {
                        goToPrinters: "Una vez que has instalado tu impresora, ve a {controlPanel} y después a {printers}. Una vez ahí, haz clic derecho en la impresora que quieres compartir y elige {properties}",
                        controlPanel: "Panel de control",
                        printers: "Impresoras y escáneres",
                        properties: "Propiedades de impresora",
                        goToShareTab: "Ve a la pestaña {shareTab} y si la opción {shareThisPrinter} está deshabilitada, habilítala haciendo clic en {changeShareOptions}",
                        shareTab: "Uso compartido",
                        shareThisPrinter: "Compartir esta impresora",
                        changeShareOptions: "Cambiar opciones de uso compartido",
                        finishSharing: "Una vez que has habilitado el uso compartido, haz clic en la caja de {shareThisPrinter} y escribe el mismo nombre {nameWarning}. Debe ser el mismo nombre que el de tu impresora {imageShared} Finalmente haz clic en {ok} y tu impresora estará compartida",
                        ok: "Aceptar",
                        nameWarning: "usando solo letras, nada de espacios",
                    },
                    windows11: {
                        goToPrinters: "Una vez que has instalado tu impresora busca y elige {printers} en el menú inicio. Una vez ahí, haz clic en la impresora que quieres compartir. Eso te llevará a la pestaña {printerSettings}, haz clic en {properties}",
                        printers: "Impresoras y escáneres",
                        printerSettings: "Configuración de la impresora",
                        properties: "Propiedades de impresora",
                        goToShareTab: "Ve a la pestaña {shareTab} y si la opción {shareThisPrinter} está deshabilitada habilítala haciendo clic en {changeShareOptions}",
                        shareTab: "Uso compartido",
                        shareThisPrinter: "Compartir esta impresora",
                        changeShareOptions: "Cambiar opciones de uso compartido",
                        finishSharing: "Una vez que has habilitado la compartición de la impresora, marca la caja de {shareThisPrinter} y escribe el mismo nombre {nameWarning}. Debe tener el mismo nombre que tu impresora {imageShared} Finalmente haz clic en {ok} y tu impresora estará compartida. Los pasos son mostrados en la siguiente imagen:",
                        ok: "Aceptar",
                        nameWarning: "usando solo letras, nada de espacios",
                    },
                    linux: {
                        note: "En distribuciones basadas en Debian y Raspberry Pi OS este paso no es necesario"
                    }
                },
                downloadAndExecutePlugin: {
                    title: "Descargar y ejecutar plugin",
                    windows: {
                        title: "Windows 8, 8.1, 10 y 11",
                        navigateToPluginDownload: "Navega al siguiente enlace: {link} y una vez ahí ve al final de la página hasta que encuentres la sección que dice Assets",
                        unknownArch: "Si no conoces la arquitectura de tu sistema operativo, descarga {plugin64}",
                        plugin64: "plugin_v3.2.1.zip",
                        plugin32: "plugin_v3.2.1_si.zip",
                        knownArch: "Si conoces la arquitectura de tu dispositivo, puedes elegir {plugin64} para 64 bits o {plugin32} para 32 bits",
                        compatibility: "Si más adelante tienes problemas de compatibilidad, tal vez descargaste el plugin para una arquitectura distinta. En ese caso, descarga {plugin32}",
                        antivirusesWarning: "En algunos casos, tu navegador web o antivirus bloqueará la descarga. {pluginIsSecure} y es tu responsabilidad forzar la descarga",
                        pluginIsSecure: "El plugin no contiene ningún tipo de virus",
                        onceDownloaded: "Una vez descargado, si es un archivo zip, debes extraerlo. En algunos sistemas la opción para extraerlo aparecerá al hacer clic derecho en el archivo, y en otros sistemas puedes usar software como WinZip, 7-Zip, etcétera. La extracción queda fuera del alcance de este tutorial, pero {mandatoryToExtract}",
                        mandatoryToExtract: "Es obligatorio extraerlo y ejecutarlo, y no solo abrirlo desde el software extractor",
                        onceExtracted: "Una vez extraído, tendrás un archivo ejecutable y en algunos casos un archivo DLL (esa DLL siempre debe estar en la misma carpeta que el plugin)",
                        secondWarning: "De nuevo, algunas veces Windows o tu antivirus bloqueará la ejecución del plugin. Debes hacer clic en {moreInfo}, {advancedOptions} o la opción que te permita forzar la ejecución. Esa opción puede variar entre sistemas operativos y antivirus. {givePermissions}, por ejemplo, en la siguiente imagen yo estoy forzando la ejecución: ",
                        moreInfo: "Más información",
                        advancedOptions: "Opciones avanzadas",
                        givePermissions: "Debes darle al plugin todos los permisos que pida. Es totalmente seguro",
                        executionError: "Si has ejecutado el plugin, pero aparece un error de ejecución o compatibilidad (y no uno de seguridad) entonces descarga el archivo llamado {plugin32}",
                        noErrors: "Si no hay ningún error, ve al siguiente paso. El plugin no abre ningún tipo de ventana (solo al listar las impresoras).",
                        finalCheck: "Como una comprobación final, puedes abrir el administrador de tareas {keyCommand}, ir a {details} y revisar si el plugin se está ejecutando; debería tener el mismo nombre que el ejecutable, por ejemplo:",
                        details: "Detalles",
                    },
                    linux: {
                        title: "Linux y Raspberry Pi OS",
                        navigateToPluginDownload: "Ve al siguiente enlace: {link} y una vez ahí, navega hacia abajo hasta que veas la sección de Assets",
                        debianBased: "Si usas un sistema operativo basado en Debian, elige {plugin_debian}",
                        raspberryPiOSBased: "Si usas Raspberry Pi OS, elige {plugin_raspberry}",
                        debian: "plugin_v3.2.1_d.zip",
                        raspberryPiOS: "plugin_v3.2.1_r.zip",
                        forceDownload: "En algunos casos, tu navegador web o antivirus bloqueará la descarga. {pluginSafe}, y es tu responsabilidad forzar la descarga",
                        pluginSafe: "El plugin es totalmente seguro y no contiene ningún tipo de virus",
                        onceDownloaded: "Una vez descargado, si es un archivo zip, debes extraerlo. Si tienes la utilidad {zipUtility} instalada, puedes ejecutar: {unzipCode} (cambiando el nombre del archivo descargado como sea necesario)",
                        onceExtracted: "Una vez extraído, tendrás un archivo ejecutable. Algunas veces estará dentro de una carpeta creada por el software para extraer el zip. Dale permisos de ejecución con: {codeToGivePermission}",
                        execute: "Asegúrate de que estás ejecutando el comando en la misma ubicación donde se encuentra el plugin (cambiando con {cd} como sea necesario) y ejecuta {codeToExecutePlugin} (Recuerda que, en tu caso, el nombre del plugin podría variar)",
                        exampleLook: "Por ejemplo, puede ser así:",
                        zipName: "nombre_del_plugin_sin_extraer.zip",
                        pluginsName: "nombre_del_plugin_extraído",
                        backgroundExecute: "Si quieres ejecuta el plugin en segundo plano, ejecuta: {codeToRunInBackground}",
                        goToNextStep: "Si no hay ningún mensaje de error y el plugin se está ejecutando correctamente, ve al siguiente paso",
                    },
                },
                printTest: {
                    title: "Prueba de impresión",
                },
            },
        },
        platforms: {
            Android: {
                name: "Android",
                description: "Imprimir en Android con impresora Bluetooth",
            },
            Desktop: {
                name: "Desktop",
                description: "Imprimir en Windows, Raspbian o Linux con impresora USB",
            },
        },
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