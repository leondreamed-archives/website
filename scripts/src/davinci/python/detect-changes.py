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

project = projectManager.LoadProject(projectName)

timeline = project.GetTimelineByIndex(1)
timelineItems = timeline.GetItemListInTrack("video", 1)
compositionFolder = os.path.join(dirname, './assets/davinci/compositions')
if not os.path.exists(compositionFolder):
	os.makedirs(compositionFolder)

for timelineItem in timelineItems:
	name = timelineItem.GetName()
	fusionComp = timelineItem.GetFusionCompByIndex(1)
	timelineItem.ExportFusionComp(os.path.join(rootPath, './assets/davinci/compositions/' + name + '.comp'), 1)
