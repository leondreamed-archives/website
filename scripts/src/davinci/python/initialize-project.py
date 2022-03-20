import DaVinciResolveScript as dvr_script
from inspect import getsourcefile
from os.path import abspath
import os

resolve = dvr_script.scriptapp("Resolve")
fusion = resolve.Fusion()
projectManager = resolve.GetProjectManager()
dirname = os.path.dirname(abspath(getsourcefile(lambda:0)))
rootPath = os.path.join(dirname, '../../../..')

projectName = os.environ['PROJECT_NAME']

project = projectManager.CreateProject(projectName)
if project == None:
	print("Project already exists.")
	exit(0)

# Add the compositions into the project's media pool
mediaStorage = resolve.GetMediaStorage()
compositionFilesFolder = os.path.join(rootPath, './assets/davinci/composition-files')
clips = mediaStorage.AddItemListToMediaPool([os.path.abspath(x) for x in os.listdir()])

# Import the compositions from the media pool into the timeline
mediaPool = project.getMediaPool()
mediaPool.CreateTimelineFromClips("Compositions", clips)
