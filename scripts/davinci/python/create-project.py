import DaVinciResolveScript as dvr_script

resolve = dvr_script.scriptapp("Resolve")
fusion = resolve.Fusion()
projectManager = resolve.GetProjectManager()
print(projectManager)
# projectManager.CreateProject("Hello World")