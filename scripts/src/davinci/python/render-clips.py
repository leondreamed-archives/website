# Exports a project from DaVinci Resolve into the /davinci folder

import DaVinciResolveScript as dvr_script
from inspect import getsourcefile
from os.path import abspath
import os

resolve = dvr_script.scriptapp("Resolve")
fusion = resolve.Fusion()
projectManager = resolve.GetProjectManager()
dirname = os.path.dirname(abspath(getsourcefile(lambda:0)))
davinciProjectExportPath = os.path.normpath(os.path.join(dirname, '../../../davinci/project.drp'));

projectName = os.environ['PROJECT_NAME']
project = projectManager.LoadProject(projectName)

print(project.GetRenderCodecs("QuickTime"))