import DaVinciResolveScript as dvr_script
from pathlib import Path
from inspect import getsourcefile
from os.path import abspath

resolve = dvr_script.scriptapp("Resolve")
fusion = resolve.Fusion()
mediaStorage = resolve.GetMediaStorage()
projectManager = resolve.GetProjectManager()
curPath = str(Path(abspath(getsourcefile(lambda:0))).resolve().parent)
if projectManager.ExportProject("Choice Board", curPath) == False:
	raise "Failed to export project."